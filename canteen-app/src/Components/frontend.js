// Frontend.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import ReserveItem from './ReserveItem';
import './frontend.css';

const Frontend = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [reserveItems, setReserveItems] = useState([]);

  const fetchOrderItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orderItem/getAll');
      setOrderItems(response.data);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const fetchReserveItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reserveItem/getAll');
      setReserveItems(response.data);
    } catch (error) {
      console.error('Error fetching reserve items:', error);
    }
  };

  useEffect(() => {
    fetchOrderItems();
    fetchReserveItems();
  }, []);

  return (
    <div className="container">
      <h1>Order Management</h1>
      <OrderItem fetchOrderItems={fetchOrderItems} />
      <ReserveItem fetchReserveItems={fetchReserveItems} />
    </div>
  );
};

export default Frontend;
