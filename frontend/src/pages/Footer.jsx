import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Vector from "../assets/Vector.png";
import Vector1 from "../assets/Vector1.png";
import Vector2 from "../assets/Vector2.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#219653] text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/20 pb-10">
        {/* Brand Section */}
        <div>
          <div
            className="flex items-center gap-3 cursor-pointer mb-3"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="AgriPact" className="w-12 h-12" />
            <h2 className="text-2xl font-bold">AgriPact</h2>
          </div>
          <p className="text-white/90 leading-relaxed">
            Kisaan income ka ek matra sadhan. Empowering farmers through
            technology, transparency, and trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li className="hover:underline cursor-pointer">Market</li>
            <li
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/feedback")}
            >
              Feedback
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/support-center")}
            >
              Support Center
            </li>
            <li
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/help")}
            >
              Help Center
            </li>
            <li
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/partner-dispute")}
            >
              Partner Dispute
            </li>
            <li
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/faq")}
            >
              FAQs
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Connect with us
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={Vector}
              alt="Facebook"
              className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
            />
            <img
              src={Vector1}
              alt="Instagram"
              className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
            />
            <img
              src={Vector2}
              alt="Twitter"
              className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
            />
          </div>
          <p className="text-white/90">
            Made with ❤️ by <strong>DEFENDER_WARRIORS</strong>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-white/80 mt-8 text-sm">
        © {new Date().getFullYear()} AgriPact. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
