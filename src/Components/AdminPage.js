import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        calories: '',
        price: '',
        description: '',
        image: '',
    });
    const [menuItems, setMenuItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);

    const categories = ['Breakfast', 'Lunch', 'Snacks', 'Drinks', 'Dessert'];

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/menu/get');
            const data = await response.json();
            console.log("Fetched menu items:", data); // Log fetched items
            setMenuItems(data);
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
        console.log(`Updated ${name} to:`, value); // Log input changes
    };

    const handleAddItem = async () => {
        if (isEditing) {
            await handleUpdateItem();
        } else {
            await handleCreateItem();
        }
        resetForm();
    };

    const handleCreateItem = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/menu/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newItem,
                    user: { userId: 1 }  // Example user ID, adjust if necessary
                }),
            });

            if (response.ok) {
                const newMenuItem = await response.json();
                setMenuItems([...menuItems, newMenuItem]);
                console.log("Created new menu item:", newMenuItem); // Log new item created
            } else {
                console.error('Failed to create item:', response.statusText);
            }
        } catch (error) {
            console.error("Error adding menu item:", error);
        }
    };

    const handleUpdateItem = async () => {
        console.log("Updating item with ID:", currentItemId); // Log current item ID
        try {
            const response = await fetch(`http://localhost:8080/api/menu/put?id=${currentItemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                const updatedItem = await response.json();
                setMenuItems(menuItems.map((item) => item.menuItemID === currentItemId ? updatedItem : item));
                console.log("Updated menu item:", updatedItem); // Log updated item
            } else {
                console.error('Failed to update item:', response.statusText);
            }
        } catch (error) {
            console.error("Error updating menu item:", error);
        }
    };

    const resetForm = () => {
        setNewItem({
            name: '',
            category: '',
            calories: '',
            price: '',
            description: '',
            image: '',
        });
        setIsEditing(false);
        setCurrentItemId(null);
        console.log("Form reset"); // Log form reset
    };

    const handleEditItem = (item) => {
        setNewItem(item);
        setIsEditing(true);
        setCurrentItemId(item.menuItemID);
        console.log("Editing item:", item); // Log item being edited
    };

    const handleDeleteItem = async (itemId) => {
        console.log("Deleting item with ID:", itemId); // Log item ID being deleted
        try {
            const response = await fetch(`http://localhost:8080/api/menu/delete/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMenuItems(menuItems.filter(item => item.menuItemID !== itemId));
                console.log("Deleted item with ID:", itemId); // Log deleted item ID
            } else {
                console.error("Failed to delete item:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting menu item:", error);
        }
    };

    const groupedItems = menuItems.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {});

    return (
        <div className="admin-page">
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="nav-links">
                     <Link to="/admin">Menu</Link>
                    <Link to="/admin/users">Account</Link>
                </nav>
                <div className="canteen">Admin Panel</div>
            </header>
            <div className="horizontal-line"></div>

            <div className="admin-content">
                <div className="fixed-section">
                    <h2>{isEditing ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Item Name"
                        value={newItem.name || ''}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="calories"
                        placeholder="Calories"
                        value={newItem.calories || ''}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={newItem.price || ''}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newItem.description || ''}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={newItem.image || ''}
                        onChange={handleInputChange}
                    />
                    <select
                        name="category"
                        value={newItem.category || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    <button onClick={handleAddItem}>{isEditing ? 'Update Item' : 'Add Item'}</button>
                </div>

                <div className="menu-items-container">
                    <h2>Current Menu Items</h2>
                    <div className="categories-grid">
                        {Object.keys(groupedItems).map((category) => (
                            <div className="category-column" key={category}>
                                <h3>{category}</h3>
                                <ul>
                                {groupedItems[category].map((item) => (
                                    <li key={item.menuItemID}>
                                        <span>{item.name} - {item.calories} Calories - &#8369;{item.price}</span>
                                        <p>{item.description}</p>
                                        {item.image && <img src={item.image} alt={item.name} style={{ maxWidth: '100px', display: 'block' }} />}
                                        <div className="button-group">
                                            <button onClick={() => handleEditItem(item)}>Edit</button>
                                            <button onClick={() => handleDeleteItem(item.menuItemID)}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
