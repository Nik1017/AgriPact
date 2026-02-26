import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MapPin,
  IndianRupee,
  LogOut,
  Leaf,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Backend_URL } from "../../utils/utils";

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${Backend_URL}/product/allproducts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products!");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // Cart logic
  const addToCart = (product) => {
    const existing = cart.find((item) => item.product._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1, price: product.price }]);
    }
    toast.success(`${product.title} added to cart!`);
  };

  const updateQuantity = (productId, change) => {
    setCart(
      cart
        .map((item) =>
          item.product._id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    const removedItem = cart.find((item) => item.product._id === productId);
    setCart(cart.filter((item) => item.product._id !== productId));
    toast.warn(`${removedItem.product.title} removed from cart.`);
  };

  const getTotalAmount = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Navigate to payment page with cart data
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Store cart data in localStorage for payment page
    localStorage.setItem("cartData", JSON.stringify(cart));
    localStorage.setItem("totalAmount", getTotalAmount().toString());
    
    // Navigate to payment page
    navigate("/payment");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-3 text-gray-600">
          <Leaf size={28} className="text-green-600 animate-spin" />
          <span className="text-lg">Loading fresh products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-2">
            <Leaf size={26} className="text-green-600" />
            <h1 className="text-2xl font-bold text-green-700">
              Farm Fresh Market
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition flex items-center gap-1"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center bg-gray-200 hover:bg-red-400 text-gray-700 px-3 py-2 rounded-lg transition"
            >
              <LogOut size={18} className="mr-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Products */}
        <div className={`flex-1 ${showCart ? "lg:w-2/3" : "w-full"}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Available Products
          </h2>
          {products.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-xl shadow">
              <p className="text-gray-500">No products available right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  {product.photos && (
                    <img
                      src={product.photos}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    {product.address && (
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <MapPin size={14} className="mr-1" />
                        <span>{product.address}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-green-600 font-bold text-lg">
                        <IndianRupee size={18} />
                        <span>{product.price}</span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                      >
                        <ShoppingCart size={16} />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        {showCart && (
          <div className="lg:w-1/3 w-full">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Your Cart
              </h2>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Your cart is empty
                </p>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                    {cart.map((item) => (
                      <div key={item.product._id} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-800 flex-1">
                            {item.product.title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.product._id, -1)
                              }
                              className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product._id, 1)
                              }
                              className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="flex items-center font-semibold text-green-600">
                            <IndianRupee size={16} />
                            <span>{item.price * item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-gray-800">
                        Total:
                      </span>
                      <div className="flex items-center text-2xl font-bold text-green-600">
                        <IndianRupee size={22} />
                        <span>{getTotalAmount()}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-semibold"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;