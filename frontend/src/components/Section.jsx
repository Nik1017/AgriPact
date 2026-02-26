import React from "react";
import vector11 from "../assets/vector11.svg";
import vector22 from "../assets/vector22.svg";
import vector33 from "../assets/vector33.svg";

function Section() {
  const features = [
    {
      image: vector11,
      title: "24×7 Customer Support",
      desc: "We’re always here to help — anytime, anywhere.",
    },
    {
      image: vector22,
      title: "Trusted Sellers & Buyers",
      desc: "Ensuring secure and reliable trading every time.",
    },
    {
      image: vector33,
      title: "One-Click Booking",
      desc: "Fast, easy, and time-saving booking experience.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-green-50 to-green-100 py-16 px-6 md:px-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 uppercase tracking-wide">
          What We Offer
        </h1>
        <p className="text-lg text-gray-700 mt-3 opacity-90">
          Being a part of <span className="font-semibold text-green-700">AgriPact</span>
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
          >
            <div className="h-24 w-24 flex items-center justify-center bg-green-100 rounded-full mb-6">
              <img src={item.image} alt={item.title} className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Section;
