// OrderHistory.js
import React, { useEffect, useState } from 'react';
import { getOrders } from '../remotes/woocommerce'; // Import the function to fetch orders

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders when the component mounts
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Assuming getOrders returns an array of orders
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>Order ID:</strong> {order.id}<br />
            <strong>Status:</strong> {order.status}<br />
            <strong>Total:</strong> {order.total}<br />
            {/* ... other order details */}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;