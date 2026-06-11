import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type OrderStatus = 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';

export interface AdminOrder {
  id: string;
  customer: string;
  items: string;
  total: string;
  status: OrderStatus;
  paymentMethod: string;
  paymentProof?: string;
}

interface OrderContextType {
  orders: AdminOrder[];
  addOrder: (order: Omit<AdminOrder, 'id' | 'status'> & { paymentProof?: string }) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error);
          return;
        }

        if (data) {
          setOrders(data.map(order => {
            const hasProof = order.payment_method && order.payment_method.includes(' [PROOF] ');
            const paymentMethod = hasProof ? order.payment_method.split(' [PROOF] ')[0] : (order.payment_method || 'Cash on Delivery');
            const paymentProof = hasProof ? order.payment_method.split(' [PROOF] ')[1] : undefined;
            return {
              id: order.id,
              customer: order.customer,
              items: order.items,
              total: order.total,
              status: order.status as OrderStatus,
              paymentMethod,
              paymentProof
            };
          }));
        }
      } catch (err) {
        console.error('Catch fetching orders:', err);
      }
    }
    loadOrders();
  }, []);

  const addOrder = async (orderData: Omit<AdminOrder, 'id' | 'status'> & { paymentProof?: string }) => {
    const orderId = `#ORD-${Math.floor(Math.random() * 900) + 100}`;
    const combinedPaymentMethod = orderData.paymentProof
      ? `${orderData.paymentMethod} [PROOF] ${orderData.paymentProof}`
      : orderData.paymentMethod;

    const newOrder: AdminOrder = {
      id: orderId,
      customer: orderData.customer,
      items: orderData.items,
      total: orderData.total,
      status: 'Preparing',
      paymentMethod: orderData.paymentMethod,
      paymentProof: orderData.paymentProof
    };

    try {
      const { error } = await supabase
        .from('orders')
        .insert([{
          id: orderId,
          customer: orderData.customer,
          items: orderData.items,
          total: orderData.total,
          status: 'Preparing',
          payment_method: combinedPaymentMethod
        }]);

      if (error) {
        console.error('Error inserting order into Supabase:', error);
      }
    } catch (err) {
      console.error('Catch inserting order:', err);
    }

    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error('Error updating order status in Supabase:', error);
      }
    } catch (err) {
      console.error('Catch updating order status:', err);
    }

    setOrders((prev) => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
