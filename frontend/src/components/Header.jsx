import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Briefcase, FileText } from "lucide-react";
import w from "../assets/w.png";
import background from "../assets/farmer dashboard-pica.png"

function Header() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-700"
        style={{
          backgroundImage:
            `url(${background})`,
        }}
      ></div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

      {/* Header Navigation with Glass Effect */}
      <header className="relative z-10 mx-6 mt-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
        <div className="flex justify-between items-center px-6 py-3 text-white">
          {/* Logo Section */}
          <Link to={"/"} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110">
              <img src={w} alt="Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-bold text-2xl tracking-wide bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              AgriPact
            </span>
          </Link>

          {/* Navigation Links with Icons */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 font-medium hover:text-green-400 transition-colors duration-300 group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-2 font-medium hover:text-green-400 transition-colors duration-300 group"
            >
              <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>About Us</span>
            </Link>
            <Link 
              to="/work" 
              className="flex items-center space-x-2 font-medium hover:text-green-400 transition-colors duration-300 group"
            >
              <Briefcase className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Work With Us</span>
            </Link>
            <Link 
              to="/guidelines" 
              className="flex items-center space-x-2 font-medium hover:text-green-400 transition-colors duration-300 group"
            >
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Guidelines</span>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              to={"/login"} 
              className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105"
            >
              Login
            </Link>
            <Link 
              to={"/register"} 
              className="rounded-xl border-2 border-white/50 backdrop-blur-sm px-6 py-2.5 font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 shadow-lg hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Text with Enhanced Styling */}
      <section className="relative z-10 flex justify-center items-center h-full px-4">
        <div className="text-center max-w-6xl">
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl leading-tight font-bold mb-6 drop-shadow-2xl">
            The Revolutionary Impact of{" "}
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              Technology
            </span>{" "}
            on Agriculture
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light max-w-3xl mx-auto drop-shadow-lg">
            Empowering farmers with cutting-edge solutions for a sustainable future
          </p>
          
          {/* Optional CTA */}
          <div className="mt-12 flex justify-center gap-6">
            <Link to={"/register"} className="px-8 py-4 rounded-xl bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 hover:scale-105">
              Get Started
            </Link>
            <button className="px-8 py-4 rounded-xl border-2 border-white/50 backdrop-blur-md text-white font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 shadow-2xl hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
    </div>
  );
}

export default Header;