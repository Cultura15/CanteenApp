import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // For storing the user to be edited
    const [updateMode, setUpdateMode] = useState(false); // Toggle for update mode
    const [userData, setUserData] = useState({ fname: '', lname: '', email: '', password: '' }); // State for user data input

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Fetched users:", data);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user.userId);
        setUserData({ fname: user.fname, lname: user.lname, email: user.email, password: user.password }); // Include password
        setUpdateMode(true);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/update/${selectedUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...userData, userId: selectedUser }), // Send user ID as well
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await fetchUsers(); // Refresh the user list after update
            setUpdateMode(false); // Exit update mode
            setUserData({ fname: '', lname: '', email: '', password: '' }); // Reset user data
            setSelectedUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
            setError(error.message);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/users/delete/${userId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                await fetchUsers(); // Refresh the user list after deletion
            } catch (error) {
                console.error("Error deleting user:", error);
                setError(error.message);
            }
        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="admin-page">
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="nav-links">
                    <Link to="/admin">Menu</Link>
                    <Link to="/admin/users">Account</Link>
                </nav>
                <div className="canteen">User Management</div>
            </header>
            <div className="horizontal-line"></div>

            <div className="admin-content">
                <div className="fixed-section">
                    <h2>User List</h2>
                </div>

                <div className="menu-items-container">
                    <h2>Current Users</h2>
                    <div className="categories-grid">
                        <ul>
                            {users.map(user => (
                                <li key={user.userId}>
                                    <span>{user.fname} {user.lname} - {user.email} - Password: {user.password}</span> {/* Display password */}
                                    <div className="button-group">
                                        <button onClick={() => handleEdit(user)}>Edit</button>
                                        <button onClick={() => handleDelete(user.userId)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {updateMode && (
                    <div className="update-form">
                        <h3>Edit User</h3>
                        <input type="text" name="fname" value={userData.fname} onChange={handleChange} placeholder="First Name" />
                        <input type="text" name="lname" value={userData.lname} onChange={handleChange} placeholder="Last Name" />
                        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
                        <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" />
                        <button onClick={handleUpdate}>Update User</button>
                        <button onClick={() => { setUpdateMode(false); setUserData({ fname: '', lname: '', email: '', password: '' }); }}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
