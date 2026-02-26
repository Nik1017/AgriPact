import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Package, Home, Leaf } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || "N/A";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-6">
            <CheckCircle className="text-green-600" size={64} />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be
          delivered soon.
        </p>

        {/* Order ID */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="text-lg font-mono font-semibold text-green-700">
            {orderId}
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex items-start gap-3 mb-3">
            <Package className="text-green-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                What's Next?
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                You will receive a confirmation email with order details and
                tracking information.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Leaf className="text-green-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Fresh Delivery
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Your fresh produce will be carefully packed and delivered to
                your doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/buyerdashboard")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-semibold flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/my-orders")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition font-semibold flex items-center justify-center gap-2"
          >
            <Package size={20} />
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
