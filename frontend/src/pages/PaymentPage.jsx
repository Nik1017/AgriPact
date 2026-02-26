import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CreditCard,
  Wallet,
  Banknote,
  ArrowLeft,
  IndianRupee,
  CheckCircle,
  MapPin,
  User,
  Phone,
  Home,
  Leaf,
} from "lucide-react";
import { toast } from "react-hot-toast";

const PaymentPage = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart data from localStorage
    const cartData = localStorage.getItem("cartData");
    const total = localStorage.getItem("totalAmount");

    if (!cartData || !total) {
      toast.error("No items in cart!");
      navigate("/buyer-dashboard");
      return;
    }

    setCart(JSON.parse(cartData));
    setTotalAmount(parseFloat(total));
  }, [navigate]);

  const handleInputChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { fullName, phone, street, city, state, pincode } = address;

    if (!fullName || !phone || !street || !city || !state || !pincode) {
      toast.error("Please fill all address fields!");
      return false;
    }

    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits!");
      return false;
    }

    if (pincode.length !== 6) {
      toast.error("Pincode must be 6 digits!");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const fullAddress = `${address.street}, ${address.city}, ${address.state} - ${address.pincode}`;

      const orderData = {
        products: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        paymentMethod: paymentMethod,
        address: fullAddress,
      };

      const res = await axios.post(
        "https://agri-pact-backend.vercel.app/api/v1/order/create",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success("Order placed successfully!");
        
        // Clear cart data from localStorage
        localStorage.removeItem("cartData");
        localStorage.removeItem("totalAmount");
        
        // Redirect to success page or dashboard
        setTimeout(() => {
          navigate("/order-success", { state: { orderId: res.data.order._id } });
        }, 1500);
      } else {
        toast.error("Failed to place order!");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Error while placing order!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-2">
            <Leaf size={26} className="text-green-600" />
            <h1 className="text-2xl font-bold text-green-700">Checkout</h1>
          </div>
          <button
            onClick={() => navigate("/buyerdashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Shop</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Address & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="text-green-600" size={24} />
                Delivery Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home size={16} className="inline mr-1" />
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleInputChange}
                    placeholder="House no., Building, Street"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Wallet className="text-green-600" size={24} />
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-green-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-green-600"
                  />
                  <Banknote className="ml-3 text-gray-600" size={24} />
                  <span className="ml-3 font-medium">Cash on Delivery</span>
                </label>

                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-green-50 transition opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    disabled
                    className="w-5 h-5 text-green-600"
                  />
                  <CreditCard className="ml-3 text-gray-600" size={24} />
                  <span className="ml-3 font-medium">
                    Credit/Debit Card (Coming Soon)
                  </span>
                </label>

                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-green-50 transition opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    disabled
                    className="w-5 h-5 text-green-600"
                  />
                  <Wallet className="ml-3 text-gray-600" size={24} />
                  <span className="ml-3 font-medium">UPI (Coming Soon)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex justify-between items-start border-b pb-3"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm">
                        {item.product.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center text-green-600 font-semibold">
                      <IndianRupee size={14} />
                      <span>{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <div className="flex items-center">
                    <IndianRupee size={16} />
                    <span>{totalAmount}</span>
                  </div>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <div className="flex items-center text-2xl font-bold text-green-600">
                    <IndianRupee size={22} />
                    <span>{totalAmount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg transition font-semibold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Place Order
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing order, you agree to our terms & conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;