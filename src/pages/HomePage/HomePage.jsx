import React from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import Stats from "../../components/Stats/Stats";
import Founders from "../../components/Founders/Founders";
import Testimonial from "../../components/Testimonial/Testimonial";
import History from "../../components/History/History";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="App">
      <Header />
      <Hero />
      <div id="contact">
        <Features />
      </div>
      <Stats />
      <Founders />
      <Testimonial />
      <div id="history">
        <History />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
