import React from 'react';

const Canteen1 = () => {
    const Header = () => {
        return (
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="nav-links">
                    <a href="#menu">Menu</a>
                    <a href="#cart">Cart</a>
                    <a href="#account">Account</a>
                </nav>
                <div className="canteen">Canteen 1</div>
            </header>
        );
    };

    const SubMenuNav = () => {
        return (
            <nav className="sub-menu-nav">
                <a href="#breakfast" className="active">Breakfast</a>
                <a href="#lunch">Lunch</a>
                <a href="#snacks">Snacks</a>
                <a href="#drinks">Drinks</a>
                <a href="#dessert">Dessert</a>
            </nav>
        );
    };

    const Sidebar = () => {
        return (
            <div className="sidebar">
                <h3>Viand</h3>
                <ul>
                    <li>Egg</li>
                    <li>Hotdog</li>
                    <li>Pancakes</li>
                    <li>Sandwich</li>
                </ul>
                <h3>Morning Drinks</h3>
                <ul>
                    <li>Hot Milo</li>
                    <li>Hot Coffee</li>
                    <li>Distilled Water</li>
                </ul>
                <h3>Combo</h3>
                <ul>
                    <li>Combo 1</li>
                    <li>Combo 2</li>
                    <li>Combo 3</li>
                </ul>
            </div>
        );
    };

    const MenuGrid = () => {
        const items = [
            { name: 'Sunny Sideup Egg', imgSrc: 'sunny_side_up.png' },
            { name: 'Hotdog Bun', imgSrc: 'hotdog_bun.png' },
            { name: 'Pancake', imgSrc: 'pancake.png' },
            { name: 'Sandwich', imgSrc: 'sandwich.png' },
            { name: 'Oatmeal', imgSrc: 'oatmeal.png' },
            { name: 'Banana', imgSrc: 'banana.png' },
        ];

        return (
            <div className="menu-grid">
                <h2>Breakfast Menu</h2>
                <div className="menu-items">
                    {items.map((item, index) => (
                        <div key={index} className="menu-item">
                            <img src={`/path/to/images/${item.imgSrc}`} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="app-container">
            <Header />
            <div className="separator" /> {/* Long horizontal line */}
            <SubMenuNav />
            <div className="separator" /> {/* Another long horizontal line */}
            <div className="content-container">
                <Sidebar />
                <MenuGrid />
            </div>
        </div>
    );
};

export default Canteen1;
