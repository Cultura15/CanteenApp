import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './layout';
import './account.css';



const Account = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [profilePic, setProfilePic] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('cart');

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleDropdownOptionClick = (option) => {
        setIsDropdownOpen(false);
        if (option === 'profile') navigate('/account');
        else if (option === 'logout') {
            localStorage.removeItem('user_id');
            navigate('/login');
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/users/id/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }
                const data = await response.json();
                setUserInfo({
                    firstName: data.fname,
                    lastName: data.lname,
                    email: data.email,
                    password: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            } catch (error) {
                console.error(error);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Validate the current password before updating
        if (!userInfo.password) {
            alert("Please enter your current password.");
            return;
        }
    
        // Validate new password and confirmation match (if applicable)
        if (userInfo.newPassword && userInfo.newPassword !== userInfo.confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }
    
        // Prepare payload
        const payload = {
            fname: userInfo.firstName,
            lname: userInfo.lastName,
            email: userInfo.email, // Ensure the email is always included
            password: userInfo.newPassword || userInfo.password, // Update with new password if provided
            currentPassword: userInfo.password, // For validation on the backend
        };
    
        try {
            const userId = localStorage.getItem("user_id"); // Retrieve user ID from localStorage
            const response = await fetch(`http://localhost:8080/api/users/update/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                alert(`Failed to update profile: ${errorMessage}`);
                return;
            }
    
            const updatedUser = await response.json();
            setUserInfo({
                ...userInfo,
                firstName: updatedUser.fname,
                lastName: updatedUser.lname,
                email: updatedUser.email,
                password: "", // Clear password fields after update
                newPassword: "",
                confirmPassword: "",
            });
    
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating your profile. Please try again later.");
        }
    };
    
    

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    const styles = {
        mainContent: {
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            margin: '20px auto',
            maxWidth: '800px',
        },
        profileInfo: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
        },
        profilePic: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginRight: '20px',
            objectFit: 'cover',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        formLabel: {
            fontWeight: 'bold',
        },
        formInput: {
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
        },
        saveButton: {
            padding: '10px',
            backgroundColor: '#ffcc00',
            border: 'none',
            color: '#333',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
        togglePasswordButton: {
            background: 'none',
            border: 'none',
            color: '#007BFF',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Layout
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            handleDropdownOptionClick={handleDropdownOptionClick}
        >
            <div style={styles.mainContent}>
                {/* Add the Account Settings header here */}
                <h2 style={{ marginTop: '150px' }}>Account Settings</h2>

    
                <div style={styles.profileInfo}>
                  
                    <div>
                        <h2>{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
                        <p><strong>Email:</strong> {userInfo.email}</p>
                    </div>
                </div>
                <form style={styles.form} onSubmit={handleSubmit}>
                   
                    <label style={styles.formLabel}>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleChange}
                            style={styles.formInput}
                        />
                    </label>
                    <label style={styles.formLabel}>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleChange}
                            style={styles.formInput}
                        />
                    </label>
                    <label style={styles.formLabel}>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            style={styles.formInput}
                            disabled
                        />
                    </label>
                    <div>
                        <label style={styles.formLabel}>
                            Current Password:
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={userInfo.password}
                                onChange={handleChange}
                                style={styles.formInput}
                            />
                        </label>
                        <button type="button" onClick={togglePasswordVisibility} style={styles.togglePasswordButton}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div>
                        <label style={styles.formLabel}>
                            New Password:
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                name="newPassword"
                                value={userInfo.newPassword}
                                onChange={handleChange}
                                style={styles.formInput}
                            />
                        </label>
                        <button type="button" onClick={toggleNewPasswordVisibility} style={styles.togglePasswordButton}>
                            {showNewPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div>
                        <label style={styles.formLabel}>
                            Confirm New Password:
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={userInfo.confirmPassword}
                                onChange={handleChange}
                                style={styles.formInput}
                            />
                        </label>
                        <button type="button" onClick={toggleConfirmPasswordVisibility} style={styles.togglePasswordButton}>
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <button type="submit" style={styles.saveButton}>Save Changes</button>
                </form>
            </div>
        </Layout>
    );
    
    
};

export default Account;
