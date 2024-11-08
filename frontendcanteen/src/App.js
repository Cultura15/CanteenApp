import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentMethod from './Components/PaymentMethod';
import SuccessfulPayment from './Components/SuccessfulPayment';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentMethod />} />
        <Route path="/successful-payment" element={<SuccessfulPayment />} />
      </Routes>
    </Router>
  );
}

export default App;
