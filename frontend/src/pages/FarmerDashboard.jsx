import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, LogOut, X, MapPin, Tag, Leaf, Package } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Backend_URL } from "../../utils/utils";

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    photos: "",
    description: "",
    parks: "",
    price: "",
  });

  const API_URL = `${Backend_URL}`;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/product/allproducts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (Array.isArray(data.products)) setProducts(data.products);
      else if (Array.isArray(data.data)) setProducts(data.data);
      else if (Array.isArray(data)) setProducts(data);
      else setProducts([]);

    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to fetch products");
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/order/allorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      console.log("Orders response:", data); // Debug log
      
      // Handle different response formats
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else if (Array.isArray(data.data)) {
        setOrders(data.data);
      } else if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
        console.warn("Unexpected orders response format:", data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = editingProduct
        ? `${API_URL}/product/edit/${editingProduct._id}`
        : `${API_URL}/product/create-product`;
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchProducts();
        closeModal();
        toast.success(editingProduct ? "Product updated!" : "Product added!");
      } else {
        toast.error("Failed to save product");
      }
    } catch (err) {
      console.error("Error saving product:", err);
      toast.error("Error while saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/product/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchProducts();
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/order/update/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success("Order status updated!");
        fetchOrders(); // Refresh orders
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Error updating status");
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title || "",
        address: product.address || "",
        photos: product.photos || "",
        description: product.description || "",
        parks: product.parks || "",
        price: product.price || "",
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        address: "",
        photos: "",
        description: "",
        parks: "",
        price: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="text-green-600" size={28} />
            <h1 className="text-2xl font-bold text-green-600">Farmer Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === "products"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === "orders"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            My Orders {orders.length > 0 && `(${orders.length})`}
          </button>
        </div>

        {/* PRODUCT TAB */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Products</h2>
              <button
                onClick={() => openModal()}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Plus size={20} /> Add Product
              </button>
            </div>

            {/* PRODUCT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border"
                >
                  <img
                    src={product.photos || "/no-image.png"}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="text-sm text-gray-700 flex items-center gap-1 mb-2">
                      <MapPin size={16} className="text-green-500" />
                      {product.address || "No address provided"}
                    </div>
                    <div className="text-sm text-gray-700 flex items-center gap-1 mb-2">
                      <Leaf size={16} className="text-green-500" />
                      Parks: {product.parks || "N/A"}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-lg font-bold text-green-600">
                        ₹{product.price}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(product)}
                          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <p className="text-center text-gray-600 col-span-full">
                  No products found. Add one to get started!
                </p>
              )}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
            
            {loadingOrders ? (
              <div className="flex justify-center items-center py-12">
                <div className="flex items-center gap-3 text-gray-600">
                  <Package size={24} className="animate-bounce text-green-600" />
                  <span>Loading orders...</span>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                <p className="text-gray-500">
                  Orders from buyers will appear here once they make purchases.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          <Package size={20} className="text-green-600" />
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Payment: <span className="font-medium capitalize">{order.paymentMethod}</span>
                        </p>
                        {order.user && (
                          <p className="text-gray-600 text-sm">
                            Customer: <span className="font-medium">{order.user.name || order.user.email}</span>
                          </p>
                        )}
                        {order.address && (
                          <p className="text-gray-600 text-sm flex items-start gap-1 mt-1">
                            <MapPin size={14} className="mt-0.5 text-green-500" />
                            <span className="flex-1">{order.address}</span>
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}
                        >
                          {order.orderStatus}
                        </span>
                        <p className="text-xl font-bold text-green-600 mt-2">
                          ₹{order.totalAmount}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t pt-4 mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm">Order Items:</h4>
                      {order.products && order.products.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm mb-2 bg-gray-50 p-2 rounded">
                          <span className="text-gray-700">
                            {item.product?.title || "Product"} <span className="text-gray-500">x{item.quantity}</span>
                          </span>
                          <span className="font-medium">₹{item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Status Update Buttons */}
                    <div className="border-t pt-4">
                      <p className="text-xs text-gray-600 mb-2">Update Order Status:</p>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleStatusUpdate(order._id, "processing")}
                          disabled={order.orderStatus === "processing"}
                          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                          Processing
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(order._id, "shipped")}
                          disabled={order.orderStatus === "shipped"}
                          className="px-3 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                          Shipped
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(order._id, "delivered")}
                          disabled={order.orderStatus === "delivered"}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                          Delivered
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(order._id, "cancelled")}
                          disabled={order.orderStatus === "cancelled"}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Product Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="text"
                placeholder="Photo URL"
                value={formData.photos}
                onChange={(e) => handleInputChange("photos", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                rows="3"
              />
              <input
                type="text"
                placeholder="Parks"
                value={formData.parks}
                onChange={(e) => handleInputChange("parks", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition cursor-pointer"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;