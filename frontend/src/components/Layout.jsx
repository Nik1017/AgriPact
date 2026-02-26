import React from "react";
import Header from "./Header";
import Footer from "../pages/Footer";
import Section from "./Section";
import HeroSection1 from "./HeroSection1";
import HeroSection2 from "./HeroSection2";

function Layout() {
  return (
    <div>
      <Header />
      <Section />
      <HeroSection1 />
      <HeroSection2 />
      <Footer />
    </div>
  );
}

export default Layout;
