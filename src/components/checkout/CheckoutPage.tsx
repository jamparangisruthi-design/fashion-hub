import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Check,
  CreditCard,
  QrCode,
  Truck,
  Building,
  DollarSign,
  ArrowRight,
  Package,
  Printer,
  ChevronRight,
  MapPin,
  Lock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { Address, Order } from '../../types';

interface CheckoutPageProps {
  onNavigateHome: () => void;
  onNavigateToOrders: () => void;
}

type Step = 'address' | 'payment' | 'confirmation';
type PaymentMethod = 'upi' | 'card' | 'cod' | 'netbanking';

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onNavigateHome,
  onNavigateToOrders
}) => {
  const { cart, subtotal, discount, deliveryFee, total, appliedCoupon, clearCart } = useCart();
  const { user, addAddress } = useAuth();
  const { createOrder } = useOrders();

  const [currentStep, setCurrentStep] = useState<Step>('address');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user?.addresses.find(a => a.isDefault)?.id || user?.addresses[0]?.id || 'new'
  );

  // New Address Form State
  const [showNewAddressForm, setShowNewAddressForm] = useState(
    !user || user.addresses.length === 0
  );
  const [newAddr, setNewAddr] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
    country: 'India',
    tag: 'home' as 'home' | 'work' | 'other'
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: user?.name || '',
    expiry: '',
    cvv: ''
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Helper for test card auto-fill
  const fillTestCard = () => {
    setCardData({
      cardNumber: '4532 •••• •••• 8892',
      cardHolder: user?.name || 'Aarav Malhotra',
      expiry: '12/28',
      cvv: '782'
    });
  };

  const getEffectiveShippingAddress = (): Address => {
    if (selectedAddressId !== 'new' && user?.addresses) {
      const existing = user.addresses.find(a => a.id === selectedAddressId);
      if (existing) return existing;
    }
    return {
      id: `addr-${Date.now()}`,
      ...newAddr,
      isDefault: true
    };
  };

  const handleAddressContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAddressId === 'new') {
      if (!newAddr.fullName || !newAddr.phone || !newAddr.street || !newAddr.city || !newAddr.postalCode) {
        alert('Please fill out all required shipping address fields.');
        return;
      }
      addAddress(newAddr);
    }
    setCurrentStep('payment');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const address = getEffectiveShippingAddress();
      const orderNumber = `FH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        userId: user?.id || 'guest',
        customerName: address.fullName,
        customerEmail: user?.email || 'customer@fashhub.com',
        customerPhone: address.phone,
        date: new Date().toISOString(),
        items: [...cart],
        shippingAddress: address,
        shippingMethod,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        subtotal,
        discount,
        couponCode: appliedCoupon?.code,
        deliveryFee,
        total,
        status: 'placed',
        estimatedDelivery: '3–5 Days',
        trackingSteps: [
          { title: 'Order Confirmed', desc: 'Western fashion items reserved.', timestamp: 'Just now', completed: true },
          { title: 'Packaging & Quality Check', desc: 'Inspecting seams and fabric quality.', timestamp: 'Pending', completed: false },
          { title: 'Shipped', desc: 'Dispatched with BlueDart Express.', timestamp: 'Pending', completed: false },
          { title: 'Out for Delivery', desc: 'Assigned to courier partner.', timestamp: 'Pending', completed: false },
          { title: 'Delivered', desc: 'Delivered to recipient address.', timestamp: 'Pending', completed: false }
        ]
      };

      const placed = createOrder(newOrder);
      setConfirmedOrder(placed);
      clearCart();
      setIsProcessing(false);
      setCurrentStep('confirmation');

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    }, 1500);
  };

  // STEP 3: Order Confirmation Screen
  if (currentStep === 'confirmation' && confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-zinc-900 dark:text-zinc-100">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center space-y-6 animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
            <Check className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Payment & Order Successful
            </span>
            <h1 className="text-3xl font-display font-black uppercase tracking-tight mt-1">
              THANK YOU FOR YOUR ORDER!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2">
              Order ID: <strong className="text-zinc-900 dark:text-white font-mono">{confirmedOrder.orderNumber}</strong>
            </p>
          </div>

          {/* Order Details summary box */}
          <div className="bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl p-6 text-left space-y-4 text-xs border border-zinc-200/80 dark:border-zinc-800">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <p className="text-zinc-400 uppercase font-semibold text-[10px]">Deliver To:</p>
                <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-1">{confirmedOrder.shippingAddress.fullName}</p>
                <p className="text-zinc-500">{confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}</p>
                <p className="text-zinc-500">{confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.postalCode}</p>
              </div>

              <div>
                <p className="text-zinc-400 uppercase font-semibold text-[10px]">Payment Method:</p>
                <p className="font-bold uppercase text-zinc-800 dark:text-zinc-200 mt-1">{confirmedOrder.paymentMethod}</p>
                <p className="text-emerald-600 font-semibold">{confirmedOrder.paymentStatus === 'paid' ? 'Paid Online' : 'Pay on Delivery'}</p>
                <p className="text-zinc-500 mt-1">Total Paid: <strong>₹{confirmedOrder.total}</strong></p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <p className="text-zinc-400 uppercase font-semibold text-[10px]">Items in Shipment:</p>
              {confirmedOrder.items.map(i => (
                <div key={i.id} className="flex justify-between items-center text-xs">
                  <span>{i.product.name} ({i.selectedSize}) × {i.quantity}</span>
                  <span className="font-bold">₹{i.product.discountedPrice * i.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice Receipt</span>
            </button>

            <button
              onClick={onNavigateToOrders}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:opacity-90"
            >
              <Package className="w-4 h-4" />
              <span>Track Live Shipment</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="w-full sm:w-auto px-6 py-3 text-xs text-zinc-500 hover:text-black dark:hover:text-white font-semibold underline"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Checkout Stepper */}
      <div className="flex items-center justify-center space-x-4 mb-8 text-xs font-bold uppercase tracking-wider">
        <div className={`flex items-center space-x-2 ${currentStep === 'address' ? 'text-black dark:text-white' : 'text-emerald-600'}`}>
          <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-[11px]">
            1
          </span>
          <span>Delivery Address</span>
        </div>
        <ChevronRight className="w-4 h-4 text-zinc-400" />
        <div className={`flex items-center space-x-2 ${currentStep === 'payment' ? 'text-black dark:text-white' : 'text-zinc-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
            currentStep === 'payment'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
          }`}>
            2
          </span>
          <span>Payment Gateway</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Form: Address or Payment */}
        <div className="lg:col-span-8">
          {currentStep === 'address' ? (
            <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
              <h2 className="text-xl font-display font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>Select or Add Delivery Address</span>
              </h2>

              {/* Saved Addresses list */}
              {user && user.addresses.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Saved Addresses
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {user.addresses.map(addr => (
                      <div
                        key={addr.id}
                        onClick={() => {
                          setSelectedAddressId(addr.id);
                          setShowNewAddressForm(false);
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          selectedAddressId === addr.id
                            ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-800/60 ring-2 ring-black/10'
                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white">
                            {addr.fullName}
                          </span>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700">
                            {addr.tag}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                        </p>
                        <p className="text-xs text-zinc-500 mt-2">Phone: {addr.phone}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAddressId('new');
                      setShowNewAddressForm(true);
                    }}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2 block"
                  >
                    + Add A Different Delivery Address
                  </button>
                </div>
              )}

              {/* New Address Form */}
              {(showNewAddressForm || !user || user.addresses.length === 0) && (
                <form onSubmit={handleAddressContinue} className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs">
                  <p className="font-bold uppercase tracking-wider text-zinc-400">
                    Enter Shipping Details
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                        Recipient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aarav Malhotra"
                        value={newAddr.fullName}
                        onChange={e => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                        10-Digit Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={newAddr.phone}
                        onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                      Street Address / Flat / Building / Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 402, Lotus Grand Residences, 18th Main"
                      value={newAddr.street}
                      onChange={e => setNewAddr({ ...newAddr, street: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bengaluru / Mumbai"
                        value={newAddr.city}
                        onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Karnataka"
                        value={newAddr.state}
                        onChange={e => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                        6-Digit PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 560038"
                        value={newAddr.postalCode}
                        onChange={e => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>CONTINUE TO PAYMENT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* If existing address is selected */}
              {!showNewAddressForm && (
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="w-full sm:w-auto px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>DELIVER TO THIS ADDRESS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* STEP 2: Payment Gateway Selection */
            <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-display font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-amber-500" />
                  <span>Choose Payment Gateway</span>
                </h2>
                <button
                  onClick={() => setCurrentStep('address')}
                  className="text-xs text-zinc-500 hover:underline"
                >
                  Change Address
                </button>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                    paymentMethod === 'upi'
                      ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-800/80 ring-2 ring-black/10'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-bold">UPI / QR Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                    paymentMethod === 'card'
                      ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-800/80 ring-2 ring-black/10'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-bold">Credit/Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                    paymentMethod === 'netbanking'
                      ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-800/80 ring-2 ring-black/10'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <Building className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-bold">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                    paymentMethod === 'cod'
                      ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-800/80 ring-2 ring-black/10'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <DollarSign className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-bold">Cash on Delivery</span>
                </button>
              </div>

              {/* Selected Method Details */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      {/* Generated Live QR Simulation */}
                      <div className="w-36 h-36 p-2 bg-white rounded-2xl shadow-md border border-zinc-200 flex flex-col items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=upi://pay?pa=fashhub@upi&pn=FashHub&am=${total}`}
                          alt="Fash Hub UPI QR"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="space-y-2 text-xs flex-1">
                        <span className="inline-block px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold uppercase text-[10px]">
                          Instant UPI QR Scan
                        </span>
                        <p className="font-bold text-zinc-900 dark:text-white text-sm">
                          Scan with GPay, PhonePe, Paytm or BHIM
                        </p>
                        <p className="text-zinc-500 leading-relaxed">
                          Scan the dynamic QR code above or enter your UPI ID below for instant zero-fee checkout.
                        </p>

                        <div className="pt-2">
                          <label className="font-semibold block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">
                            Or Enter UPI ID / VPA
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. mobile@okhdfcbank"
                            value={upiId}
                            onChange={e => setUpiId(e.target.value)}
                            className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold uppercase tracking-wider text-zinc-500">
                        Test Mode Card Interface
                      </span>
                      <button
                        type="button"
                        onClick={fillTestCard}
                        className="text-amber-600 dark:text-amber-400 font-bold underline"
                      >
                        Auto-fill Test Card Details
                      </button>
                    </div>

                    <div>
                      <label className="font-bold block mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8892"
                        value={cardData.cardNumber}
                        onChange={e => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2.5 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2.5 font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-bold block mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardData.cvv}
                          onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2.5 font-mono"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400">
                      * Test payment mode activated. No actual credit card charge will occur.
                    </p>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3 text-xs">
                    <label className="font-bold uppercase tracking-wider text-zinc-500 block">
                      Select Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={e => setSelectedBank(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2.5 font-semibold"
                    >
                      <option>HDFC Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                    <p className="text-zinc-500">
                      You will be simulated to complete authorization with {selectedBank}.
                    </p>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-zinc-900 dark:text-white">
                      Cash on Delivery (Pay at Doorstep)
                    </p>
                    <p className="text-zinc-500 leading-relaxed">
                      Pay with cash or UPI directly to our delivery courier associate upon package arrival.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-4 bg-[#121212] text-white dark:bg-white dark:text-black rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-xl disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>AUTHORIZING PAYMENT & SECURING ORDER...</span>
                ) : (
                  <>
                    <span>COMPLETE ORDER (₹{total})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right: Order Summary Breakdown */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4 sticky top-28">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-zinc-900 dark:text-white">
              Order Items ({cart.length})
            </h3>

            {/* List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800 space-y-3 pr-1 text-xs">
              {cart.map(i => (
                <div key={i.id} className="pt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={i.product.images[0]} alt="" className="w-10 h-12 object-cover rounded-md" />
                    <div>
                      <p className="font-semibold line-clamp-1">{i.product.name}</p>
                      <p className="text-[10px] text-zinc-400">Size: {i.selectedSize} × {i.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold">₹{i.product.discountedPrice * i.quantity}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900 dark:text-white">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-base font-extrabold text-zinc-900 dark:text-white">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center space-x-1.5 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Safe 256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
