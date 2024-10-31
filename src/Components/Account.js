import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Account = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: '', // Current password state
        newPassword: '', // New password state
        confirmPassword: '', // Confirm new password state
    });
    const [profilePic, setProfilePic] = useState(null); // State for profile picture
    const [showPassword, setShowPassword] = useState(false); // State for current password visibility
    const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
    const navigate = useNavigate(); // Use this to programmatically navigate

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
                setProfilePic(reader.result); // Update profile picture state
            };
            reader.readAsDataURL(file); // Read file as Data URL
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic (e.g., send data to server)
        console.log('User info saved:', userInfo);
        console.log('Profile picture:', profilePic);
    };

    const handleSidebarItemClick = (path) => {
        navigate(path); // Navigate to the specified path
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev); // Toggle current password visibility
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword((prev) => !prev); // Toggle new password visibility
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev); // Toggle confirm password visibility
    };

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            padding: '30px 60px',
            backgroundColor: '#e4dede',
            color: 'black',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '80px',
            zIndex: 1000,
        },
        logo: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginRight: '20px',
        },
        navLinks: {
            display: 'flex',
            gap: '20px',
            marginLeft: 'auto',
        },
        navLink: {
            color: 'black',
            textDecoration: 'none',
            position: 'relative',
            paddingBottom: '5px',
        },
        accountContainer: {
            display: 'flex',
            marginTop: '80px',
            height: 'calc(100vh - 80px)',
            width: '100vw',
        },
        sidebar: {
            width: '35%',
            backgroundColor: '#f6a12e',
            padding: '20px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box',
        },
        sidebarHeader: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '15px',
        },
        sidebarList: {
            listStyleType: 'none',
            padding: 0,
            marginTop: '10px',
        },
        sidebarItem: {
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#f49f29',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'center',
        },
        mainContent: {
            width: '65%',
            padding: '20px',
            backgroundColor: '#d6dfc2',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowY: 'auto',
            boxSizing: 'border-box',
        },
        profileInfo: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
        },
        profilePic: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginRight: '20px',
            objectFit: 'cover', // Ensure the image fits well
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        },
        formLabel: {
            marginBottom: '10px',
            fontWeight: 'bold',
        },
        formInput: {
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            marginBottom: '15px',
        },
        passwordContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
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
            marginLeft: '10px', // Margin to space out the button
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.logo}>LOGO</div>
                <nav style={styles.navLinks}>
                    <Link to="/canteen1/" style={styles.navLink}>Menu</Link>
                    <Link to="/canteen1/cart" style={styles.navLink}>Cart</Link>
                    <Link to="#account" style={styles.navLink}>Account</Link>
                </nav>
            </header>
            <div style={styles.accountContainer}>
                <aside style={styles.sidebar}>
                    <h3 style={styles.sidebarHeader}>Account Settings</h3>
                    <ul style={styles.sidebarList}>
                        <li style={styles.sidebarItem} onClick={() => handleSidebarItemClick('/canteen1/account')}>Profile</li>
                        <li style={styles.sidebarItem} onClick={() => handleSidebarItemClick('/order-history')}>Order History</li>
                        <li style={styles.sidebarItem} onClick={() => handleSidebarItemClick('/payment-methods')}>Payment Methods</li>
                    </ul>
                </aside>

                <main style={styles.mainContent}>
                    <div style={styles.profileInfo}>
                        <img
                            src={profilePic || '/path/to/profile-pic.jpg'} // Use uploaded picture or default
                            alt="User Profile"
                            style={styles.profilePic}
                        />
                        <div>
                            <h2>{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
                            <p><strong>Email:</strong> {userInfo.email}</p>
                        </div>
                    </div>

                    <form style={styles.form} onSubmit={handleSubmit}>
                        <label style={styles.formLabel}>
                            Upload Profile Picture:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={styles.formInput}
                            />
                        </label>
                        <label style={styles.formLabel}>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleChange}
                                placeholder="Jane"
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
                                placeholder="Doe"
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
                                placeholder="jane.doe@example.com"
                                style={styles.formInput}
                                disabled
                            />
                        </label>
                        <div style={styles.passwordContainer}>
                            <label style={styles.formLabel}>
                                Current Password:
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={userInfo.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                    style={styles.formInput}
                                />
                            </label>
                            <button type="button" onClick={togglePasswordVisibility} style={styles.togglePasswordButton}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div style={styles.passwordContainer}>
                            <label style={styles.formLabel}>
                                New Password:
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    value={userInfo.newPassword}
                                    onChange={handleChange}
                                    placeholder="********"
                                    style={styles.formInput}
                                />
                            </label>
                            <button type="button" onClick={toggleNewPasswordVisibility} style={styles.togglePasswordButton}>
                                {showNewPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div style={styles.passwordContainer}>
                            <label style={styles.formLabel}>
                                Confirm New Password:
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={userInfo.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="********"
                                    style={styles.formInput}
                                />
                            </label>
                            <button type="button" onClick={toggleConfirmPasswordVisibility} style={styles.togglePasswordButton}>
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <button type="submit" style={styles.saveButton}>Save Changes</button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Account;
