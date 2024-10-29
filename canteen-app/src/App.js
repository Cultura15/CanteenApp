import React from 'react';
import './App.css';
import Frontend from './Components/frontend'; // Import your Frontend component
import OrderItem from './Components/OrderItem';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Order Management</h1>
      </header>
      {/* Render the Frontend component */}
      <Frontend/>
    </div>
  );
}

export default App;
