import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

function HeroSection2() {
  const Schemes = [
    {
      image:
        "https://imgs.search.brave.com/fjXdvebLxc1qjhwjdz1lCngBAPS14ixfmB-LqwmJn2c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/amFncmFuam9zaC5j/b20vaW1hZ2VzLzIw/MjQvRmVicnVhcnkv/MjkyMjAyNC9QcmFk/aGFuLU1hbnRyaS1L/aXNhbi1TYW1tYW4t/TmlkaGktWW9qYW5h/LWFsbC1kZXRhaWxz/LWluLWhpbmRpLndl/YnA",
      title: "Pradhan Mantri Kisan Samman Nidhi",
      description:
        "Provides direct income support of ₹6,000 per year to eligible small & marginal farmers, disbursed in three equal installments via DBT. Helps with costs like seeds, fertilizers, etc.",
    },
    {
      image:
        "https://imgs.search.brave.com/n9re8o6AQ23Y-Ix33Ac-wQvbnA-kstxW5RAKITv0QkQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWNpbWcuYW1hcnVq/YWxhLmNvbS9hc3Nl/dHMvaW1hZ2VzLzIw/MjQvMDQvMTQvcG0t/a2lzYW4tc2FtbWFu/LW5pZGhpLXlvamFu/YV84ZWFkOWNhOGQ0/N2VhZjUwNDE2ZGQ4/OGI3YTEwZDc0NC5q/cGVnP3E9ODA",
      title: "PM-Kisan MaanDhan Yojana",
      description:
        "A pension scheme for small & marginal farmers aged between 18-40 years. They contribute monthly (a small amount), government matches, and on reaching 60 years, farmers receive a monthly pension of ₹3,000.",
    },
    {
      image:
        "https://images.openai.com/thumbnails/url/9pzwLHicu5meUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw6uyIwsMnDKNkwpcPdNN8kLM3HNSPIuTDELKC9Oz6wy9vI0D6_Iz3dPTwoLVCu2NTQAABdaJXQ",
      title: "Pradhan Mantri Fasal Bima Yojana",
      description:
        "Crop insurance scheme covering natural disasters, pests, disease etc. Helps protect farmer income when crops fail due to non-preventable risks. Premiums are subsidised.",
    },
    {
      image:
        "https://images.openai.com/thumbnails/url/c3-TfXicu5meUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw7xjIgodTQqNLPIdjfPNU8zDvPMjTfxTip2Tg92SfQNKKjy1TXOdStN8fAoVyu2NTQAAPllJIQ",
      title: "Agriculture Infrastructure Fund",
      description:
        "A fund of ₹1 lakh crore to support investment in agricultural infrastructure like cold storages, warehouses, and post-harvest management — reducing wastage and improving returns.",
    },
  ];

  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // we'll use custom arrows
    autoplay: false,
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="py-16 bg-gradient-to-b from-green-50 to-white">
      {/* Heading Section */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          Government Schemes
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          Explore the key initiatives introduced by the Government of India to
          empower farmers and boost agricultural development.
        </p>
      </div>

      {/* Slider Section */}
      <div className="relative max-w-5xl mx-auto px-6">
        <Slider ref={sliderRef} {...settings}>
          {Schemes.map((scheme, idx) => (
            <div key={idx} className="px-4">
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-green-200 transition-all duration-300 overflow-hidden">
                <img
                  src={scheme.image}
                  alt={scheme.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <h2 className="text-2xl font-semibold text-green-700 mb-3">
                    {scheme.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {scheme.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4">
          <button
            onClick={prevSlide}
            className="bg-white/80 hover:bg-green-100 p-2 rounded-full shadow-md transition-transform duration-200 hover:scale-110"
          >
            <ArrowLeftCircle className="text-green-600 w-8 h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/80 hover:bg-green-100 p-2 rounded-full shadow-md transition-transform duration-200 hover:scale-110"
          >
            <ArrowRightCircle className="text-green-600 w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection2;
