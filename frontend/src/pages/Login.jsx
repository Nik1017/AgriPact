import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import w from "../assets/w.png";
import axios from "axios";
import toast from "react-hot-toast";
import { Backend_URL } from "../../utils/utils.js";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "farmer",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Backend_URL}/user/login`, formData);
      if(res.status == 200) {
        const {user, token} = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);

        toast.success("Login successfully");
        if(user.role == "farmer") {
          navigate("/farmerDashboard");

        } else if(user.role == "buyer") {
          navigate("/buyerDashboard");
        } else {
          navigate("/");
        }
      } 
    } catch (error) {
      if(error.response) {
        alert("Error in Login!!");
      } else {
        alert("Server Error");
      }
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <Link to={"/"} className="flex items-center space-x-3 group w-fit">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110">
            <img src={w} alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="font-bold text-2xl tracking-wide bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
            AgriPact
          </span>
        </Link>
      </header>

      {/* Registration Form */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-sm border border-green-100">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Login into Account
              </h1>
              <p className="text-gray-600 mt-2">
                Join AgriPact and start your journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Role Selection */}
              <div className="flex justify-center gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => handleRoleChange("farmer")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-semibold transition-all duration-300 ${
                    formData.role === "farmer"
                      ? "bg-gradient-to-r from-emerald-500 to-lime-500 text-white border-transparent shadow-lg"
                      : "border-gray-200 text-gray-700 hover:border-emerald-400"
                  }`}
                >
                  <User className="h-5 w-5" /> Farmer
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("buyer")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-semibold transition-all duration-300 ${
                    formData.role === "buyer"
                      ? "bg-gradient-to-r from-emerald-500 to-lime-500 text-white border-transparent shadow-lg"
                      : "border-gray-200 text-gray-700 hover:border-emerald-400"
                  }`}
                >
                  <User className="h-5 w-5" /> Buyer
                </button>
              </div>
              
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300"
                    placeholder="Enter Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] flex items-center justify-center space-x-2 group"
              >
                <span>Login</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
