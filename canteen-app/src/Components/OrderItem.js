// OrderItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderItem = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderItem, setOrderItem] = useState({
    orderID: '',
    menuItemID: '',
    quantity: '',
    price: ''
  });

  const [editingOrderItemId, setEditingOrderItemId] = useState(null);

  // Fetch order items from the API
  const fetchOrderItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orderItem/getAll');
      setOrderItems(response.data);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderItem((prevOrderItem) => ({
      ...prevOrderItem,
      [name]: value,
    }));
  };

  const createOrderItem = async () => {
    try {
      await axios.post('http://localhost:8080/api/orderItem/create', orderItem);
      fetchOrderItems(); // Refresh order item list after creation
      setOrderItem({ orderID: '', menuItemID: '', quantity: '', price: '' }); // Reset form
    } catch (error) {
      console.error('Error creating order item:', error);
    }
  };

  const updateOrderItem = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/orderItem/update/${id}`, orderItem);
      fetchOrderItems(); // Refresh order item list after update
      setEditingOrderItemId(null); // Exit editing mode
      setOrderItem({ orderID: '', menuItemID: '', quantity: '', price: '' }); // Reset form
    } catch (error) {
      console.error('Error updating order item:', error);
    }
  };

  const deleteOrderItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/orderItem/delete/${id}`);
      fetchOrderItems(); // Refresh order item list after deletion
    } catch (error) {
      console.error('Error deleting order item:', error);
    }
  };

  const startEditingOrderItem = (item) => {
    setOrderItem(item);
    setEditingOrderItemId(item.orderID);
  };

  return (
    <div className="form-container">
      <h2>Create/Update Order Item</h2>
      <input type="text" name="orderID" placeholder="Order ID" value={orderItem.orderID} onChange={handleOrderInputChange} />
      <input type="text" name="menuItemID" placeholder="Menu Item ID" value={orderItem.menuItemID} onChange={handleOrderInputChange} />
      <input type="number" name="quantity" placeholder="Quantity" value={orderItem.quantity} onChange={handleOrderInputChange} />
      <input type="number" name="price" placeholder="Price" value={orderItem.price} onChange={handleOrderInputChange} />
      <button onClick={editingOrderItemId ? () => updateOrderItem(editingOrderItemId) : createOrderItem}>
        {editingOrderItemId ? 'Update Order Item' : 'Create Order Item'}
      </button>

      <h2>Order Items</h2>
      <ul>
        {orderItems.map((item) => (
          <li key={item.orderItemID}>
            {item.menuItemID} - {item.quantity} - {item.price}
            <button className="edit" onClick={() => startEditingOrderItem(item)}>Edit</button>
            <button className="delete" onClick={() => deleteOrderItem(item.orderItemID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItem;
