import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface StaticPagesProps {
  page: 'about' | 'contact' | 'faq' | 'shipping' | 'return' | 'privacy' | 'terms';
}

export const StaticPages: React.FC<StaticPagesProps> = ({ page }) => {
  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is FASH HUB and what makes it unique?',
      a: 'FASH HUB is an international-quality Western fashion shopping platform designed for every generation—from newborns (0-2 Yrs) and kids, to teenagers, men, women, and senior citizens. We curate premium European and American aesthetic silhouettes with certified organic and long-staple combed cotton fabrics.'
    },
    {
      q: 'How do I know my correct Western size across different collections?',
      a: 'Every product page features an interactive "Size Guide" modal that provides accurate measurements in both inches and centimeters for bust, waist, hips, chest, and height. If the fit is not 100% ideal, we offer free doorstep size exchanges within 14 days.'
    },
    {
      q: 'What are the delivery timelines and shipping charges?',
      a: 'We offer standard delivery (3–5 business days) and express delivery (1–2 business days). All orders over ₹999 qualify for FREE express shipping across India. Orders below ₹999 incur a standard fee of ₹99.'
    },
    {
      q: 'What payment options are supported?',
      a: 'We accept all major UPI apps (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking from leading banks, and Cash on Delivery (COD) across serviceable pin codes.'
    },
    {
      q: 'How does the 14-Day Return and Exchange policy work?',
      a: 'If you wish to return or exchange an item, simply visit "My Orders" or contact our WhatsApp Stylist Support. Our courier partner will pick up the package from your doorstep at zero extra cost. Refunds are initiated within 24 hours of pickup.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-zinc-900 dark:text-zinc-100 animate-fade-in">
      {/* ABOUT US */}
      {page === 'about' && (
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Our Story & Heritage
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
              ONE DESTINATION. EVERY GENERATION. ENDLESS FASHION.
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Founded on the belief that modern Western style belongs to all ages, FASH HUB bridges international runways with exceptional everyday comfort.
            </p>
          </div>

          <div className="aspect-[16/8] rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80"
              alt="FASH HUB Brand Runway"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-xs leading-relaxed">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h3 className="font-display font-bold text-sm uppercase">Generational Curation</h3>
              <p className="text-zinc-500">
                We design specialized Western apparel for six distinct age brackets: Newborn Rompers, Active Kids, Trendsetting Teenagers, Contemporary Women, Polished Men, and Senior Comfort Wear.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h3 className="font-display font-bold text-sm uppercase">Fabric Integrity</h3>
              <p className="text-zinc-500">
                Every fabric is meticulously tested: from 240 GSM heavy combed cotton and Peruvian Pima cotton to European flax linen and hypoallergenic Supima cotton.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h3 className="font-display font-bold text-sm uppercase">Doorstep Ease</h3>
              <p className="text-zinc-500">
                With lightning-fast delivery across 19,000+ Indian PIN codes, easy cash-on-delivery, and complimentary doorstep size exchanges, shopping has never been more serene.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT US */}
      {page === 'contact' && (
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              We're Here For You
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
              GET IN TOUCH
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500">
              Have questions regarding sizing, deliveries, or corporate orders? Our stylist concierge team responds within 2 business hours.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Flagship Headquarters</p>
                    <p className="text-zinc-500">FASH HUB Tower, Indiranagar 100ft Road, Bengaluru, KA 560038</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Email Support</p>
                    <p className="text-zinc-500">concierge@fashhub.com / support@fashhub.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Stylist Hotline</p>
                    <p className="text-zinc-500">+91 (80) 4123-9800 (Mon–Sat, 9AM–8PM IST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-7 bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              {contactSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="text-xl font-bold font-display uppercase">Message Received</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Thank you! A FASH HUB concierge associate will reply to your email within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold block mb-1 text-zinc-500">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1 text-zinc-500">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold block mb-1 text-zinc-500">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Sizing Advice / Order Query"
                      value={contactForm.subject}
                      onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1 text-zinc-500">Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How may our stylists assist you?"
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl p-3 focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold uppercase tracking-wider text-xs hover:opacity-90 flex items-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {page === 'faq' && (
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Clear Answers
            </span>
            <h1 className="text-3xl font-display font-extrabold uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h1>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-bold py-2 hover:text-amber-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
                </button>
                {openFaq === idx && (
                  <p className="text-xs text-zinc-500 leading-relaxed pt-2 pb-2">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SHIPPING POLICY */}
      {page === 'shipping' && (
        <div className="space-y-6 max-w-3xl mx-auto text-xs leading-relaxed">
          <h1 className="text-3xl font-display font-extrabold uppercase tracking-tight">
            SHIPPING & DISPATCH POLICY
          </h1>
          <p>
            At FASH HUB, we partner with premier express courier networks (including BlueDart, Delhivery, and XpressBees) to deliver premium Western apparel across all 28 states and union territories of India.
          </p>
          <h3 className="text-sm font-bold uppercase pt-2">1. Delivery Timelines</h3>
          <p>• Metro Cities (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai, Kolkata): 2–3 business days.</p>
          <p>• Tier 2 & Tier 3 Cities: 3–5 business days.</p>
          <p>• Remote Locations: 5–7 business days.</p>

          <h3 className="text-sm font-bold uppercase pt-2">2. Shipping Charges</h3>
          <p>• All orders of value <strong>₹999 and above qualify for 100% FREE Delivery</strong>.</p>
          <p>• Orders under ₹999 carry a flat delivery fee of ₹99.</p>

          <h3 className="text-sm font-bold uppercase pt-2">3. Real-Time Tracking</h3>
          <p>
            As soon as your order is packed and dispatched from our fulfillment center, an SMS and email notification with an active tracking URL is dispatched. You can also view live tracking updates on your FASH HUB Account portal.
          </p>
        </div>
      )}

      {/* RETURN & REFUND POLICY */}
      {page === 'return' && (
        <div className="space-y-6 max-w-3xl mx-auto text-xs leading-relaxed">
          <h1 className="text-3xl font-display font-extrabold uppercase tracking-tight">
            14-DAY RETURN & REFUND POLICY
          </h1>
          <p>
            We take supreme pride in the cut, fit, and touch of our Western garments. However, if the size isn't right or you are not completely enchanted by your purchase, you have <strong>14 days from delivery</strong> to initiate a doorstep return or exchange.
          </p>
          <h3 className="text-sm font-bold uppercase pt-2">1. Free Doorstep Pickup</h3>
          <p>
            We arrange complimentary courier pickup from your address. The item should remain in unworn condition with tags intact.
          </p>
          <h3 className="text-sm font-bold uppercase pt-2">2. Instant Sizing Exchanges</h3>
          <p>
            Need a larger or smaller size? Select "Exchange" in your account dashboard and we will dispatch your replacement size without waiting for the previous piece to return.
          </p>
          <h3 className="text-sm font-bold uppercase pt-2">3. Refund Processing</h3>
          <p>
            Prepaid orders are refunded back to the original payment source (UPI, Card, Net Banking) within 24 hours of doorstep pickup. Cash on Delivery orders are refunded via instant UPI transfer or bank NEFT.
          </p>
        </div>
      )}

      {/* PRIVACY POLICY */}
      {page === 'privacy' && (
        <div className="space-y-6 max-w-3xl mx-auto text-xs leading-relaxed">
          <h1 className="text-3xl font-display font-extrabold uppercase tracking-tight">
            PRIVACY POLICY
          </h1>
          <p>
            Your privacy and digital security are paramount to FASH HUB. We adhere to stringent international data protection standards and 256-bit SSL encryption.
          </p>
          <p>
            We collect only necessary information (such as delivery address, contact number, and email) to fulfill orders and provide bespoke fashion recommendations. We NEVER sell or license your personal information to third-party brokers.
          </p>
        </div>
      )}

      {/* TERMS & CONDITIONS */}
      {page === 'terms' && (
        <div className="space-y-6 max-w-3xl mx-auto text-xs leading-relaxed">
          <h1 className="text-3xl font-display font-extrabold uppercase tracking-tight">
            TERMS & CONDITIONS
          </h1>
          <p>
            Welcome to FASH HUB. By exploring or ordering through our digital platform, you agree to our standard terms of service. All trademarks, photography, typography, and garment designs are intellectual property of FASH HUB India Ltd.
          </p>
        </div>
      )}
    </div>
  );
};

