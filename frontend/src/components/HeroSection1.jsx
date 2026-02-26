import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroSection1() {
  const products = [
    {
      image: "https://imgs.search.brave.com/X6Y61wdHsPE34-XMqAcwAjtFJvvWwdqbuTCeippEJ3Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MDg5MDAxNzMyNjQt/YmIxNzFmYTYxN2U0/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE1ueDhaM0ps/Wlc0bE1qQmlaV0Z1/YzN4bGJud3dmSHd3/Zkh4OE1BPT0",
      title: "Beans",
      price: 273,
      location: "Darbhanga, Bihar",
    },
    {
      image: "https://imgs.search.brave.com/QCEy6vLLPrVxW8XmqHX0DLwpOdAJUWss5LHew3CpebA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTMw/NTE0Mjg0L3Bob3Rv/L3BvdGF0b2VzLWlu/LXRoZS1mYXJtLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1Z/RTVoQ0NwZXlPWXl0/SHVWX0g4QkJqYmIw/ZG9LMjFVa3YwRGxf/NDg4NjJZPQ",
      title: "Potato",
      price: 210,
      location: "Patna, Bihar",
    },
    {
      image: "https://imgs.search.brave.com/CXvzapYzfMVNRgk3nFhj0SrJs0cXXQT9i0tqYXdUmXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTc1/Mzk2ODAwL3Bob3Rv/L2ZpZWxkLW9mLW9y/Z2FuaWMtdG9tYXRv/ZXMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWNSWHJxMTUx/OHlmNjdkMFhVYURP/UmNrUkdnalA0TWF2/ZHJGOHlMM1VHbk09",
      title: "Tomato",
      price: 190,
      location: "Samastipur, Bihar",
    },
    {
      image: "https://imgs.search.brave.com/m8z56WedWVx6BL0Qy5r6X13IIKBAdk_sTwr9hT7PIqo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEzLzI3LzAyLzUw/LzM2MF9GXzEzMjcw/MjUwMjFfNXVwelIz/VDBXQU9helJrdnJW/dFpjVWVYTkVacWxt/d1EuanBn",
      title: "Brinjal",
      price: 230,
      location: "Prayagraj, UP",
    },
    {
      image: "https://imgs.search.brave.com/8hDGFY2madsMR_mOIlojAl_aE9sJqYmk7en2f9ps3HY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNTk5/Njk5MTIyL3N0b2Nr/LXBob3RvLWZyZXNo/LXJhdy1va3JhLWds/YXNzLWJvd2wtaGVh/bHRoeS1lYXRpbmct/Y29uY2VwdA",
      title: "Okra",
      price: 250,
      location: "Kota, Rajasthan",
    },
    {
      image: "https://imgs.search.brave.com/9qkwdRSBaQ7Y2l2TL_-M2euzYgDmlZqBuwhb5Yao9D8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9vbmlv/bnMtb25pb24tZmll/bGQtY2xvc2UtdXAt/MjY4NTA2NjcuanBn",
      title: "Onion",
      price: 180,
      location: "Bilaspur, Chhattisgarh",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="py-16 px-6 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700">
          Our Featured Products
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Freshly sourced from local farmers — explore the best of our produce
          and make every meal healthy!
        </p>
      </div>

      {/* Slider Section */}
      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {products.map((el, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-72 mx-auto">
                <img
                  src={el.image}
                  alt={el.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4 text-center">
                  <h2 className="text-2xl font-semibold text-green-800 mb-2">
                    {el.title}
                  </h2>
                  <p className="text-gray-700 mb-1">₹{el.price} / kg</p>
                  <p className="text-gray-500 text-sm">{el.location}</p>
                  <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default HeroSection1;
