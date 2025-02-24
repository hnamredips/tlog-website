import React from "react";
import GooglePlay from "../../assets/GooglePlay.svg";
import AppStore from "../../assets/AppStore.svg";
import "./Stats.css";

function Stats() {
  return (
    <section className="stats">
      <div className="stats-container">
        <h2>
          Tải ngay ứng dụng TLog và bắt đầu theo dõi hành trình niềng răng của
          bạn hôm nay !
        </h2>
        <div className="app-store-buttons">
          <a
            href="#"
            className="store-button"
            aria-label="Get it on Google Play"
          >
            <img src={GooglePlay} alt="Get it on Google Play" />
          </a>
          <a
            href="#"
            className="store-button"
            aria-label="Download on the App Store"
          >
            <img src={AppStore} alt="Download on the App Store" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Stats;
