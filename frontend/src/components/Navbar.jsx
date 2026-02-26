import React from "react";
import { Link } from "react-router-dom";
import w from "../assets/w.png";
import { Home, Users, Briefcase, FileText } from "lucide-react";

function Navbar() {
  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
      <header className="relative z-10 mx-6 mt-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
        <div className="flex justify-between items-center px-6 py-3 text-white">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-lime-400/50 transition-all duration-300 group-hover:scale-110">
              <img src={w} alt="Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-bold text-2xl tracking-wide bg-gradient-to-r from-white to-lime-200 bg-clip-text text-transparent">
              AgriPact
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 font-medium hover:text-lime-300 transition-colors duration-300 group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center space-x-2 font-medium hover:text-lime-300 transition-colors duration-300 group"
            >
              <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>About Us</span>
            </Link>
            <Link
              to="/work"
              className="flex items-center space-x-2 font-medium hover:text-lime-300 transition-colors duration-300 group"
            >
              <Briefcase className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Work With Us</span>
            </Link>
            <Link
              to="/guidelines"
              className="flex items-center space-x-2 font-medium hover:text-lime-300 transition-colors duration-300 group"
            >
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Guidelines</span>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 text-white px-6 py-2.5 font-semibold hover:from-emerald-600 hover:to-lime-600 transition-all duration-300 shadow-lg hover:shadow-lime-400/50 hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl border-2 border-white/50 backdrop-blur-sm px-6 py-2.5 font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 shadow-lg hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
