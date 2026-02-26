import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Guidelines from "./pages/Guidelines";
import About from "./pages/About";

import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashBoard from "./pages/BuyerDashBoard";

import PaymentPage from "./pages/PaymentPage";
import OrderSuccess from "./pages/OrderSuccess";

import WorkWithUs from "./pages/WorkWithUs";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<WorkWithUs />} />

        <Route path="/farmerDashboard" element={<FarmerDashboard />} />
        <Route path="/buyerDashboard" element={<BuyerDashBoard />} />

        
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
