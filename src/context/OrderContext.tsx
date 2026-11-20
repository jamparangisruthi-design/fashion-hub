import React, { createContext, useContext, useState } from 'react';
import { Order } from '../types';
import { StorageService } from '../services/storage';

interface OrderContextType {
  orders: Order[];
  createOrder: (order: Order) => Order;
  updateStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => StorageService.getOrders());

  const createOrder = (newOrder: Order): Order => {
    const updated = StorageService.saveOrder(newOrder);
    setOrders(updated);
    return newOrder;
  };

  const updateStatus = (orderId: string, status: Order['status']) => {
    const updated = StorageService.updateOrderStatus(orderId, status);
    setOrders([...updated]);
  };

  const getOrderById = (orderId: string) => orders.find(o => o.id === orderId);

  const getOrderByNumber = (orderNumber: string) =>
    orders.find(o => o.orderNumber.toLowerCase() === orderNumber.toLowerCase());

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateStatus,
        getOrderById,
        getOrderByNumber
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};
