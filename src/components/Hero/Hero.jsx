import React from "react";
import "./Hero.css";
import dentistImage from "../../assets/dentist.png"; // Adjust the path to your image

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>TLog – Cùng bạn trên hành trình răng đẹp !</h1>
          <p>
            Giúp bạn dễ dàng theo dõi quá trình điều trị niềng răng bằng công
            nghệ 3D tiên tiến và quản lý lịch hẹn trực tiếp trên điện thoại.
            Niềm vui bắt đầu từ một nụ cười khỏe mạnh.
          </p>
          <button className="cta-button">Bắt đầu thôi !</button>
        </div>
        <img src={dentistImage} alt="Dentist" className="hero-image" />
      </div>
    </section>
  );
};

export default Hero;
