import React, { useState } from "react";
import { Star } from "lucide-react";
import "./Testimonial.css";

function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ngọc Anh",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Client%20Review-ds84NaqcGBOzCIYgJwuM2COrXxCmOE.png",
      rating: 5,
      quote:
        "Từ khi sử dụng TLog, mình không cần đến nha sĩ thường xuyên nữa, tiết kiệm thời gian rất nhiều mà vẫn theo dõi được tiến trình niềng răng hàng ngày.",
    },
    // Add more testimonials here if needed
  ];

  return (
    <section className="testimonial">
      <div className="testimonial-container">
        <div className="testimonial-content">
          <div className="testimonial-cards">
            <div className="testimonial-card-wrapper">
              <div className="testimonial-card">
                <div className="testimonial-image-container">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1708110921205-796fd04d6b00?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="customer image"
                    className="testimonial-image"
                  />
                </div>
                <h3 className="testimonial-name">
                  {testimonials[currentSlide].name}
                </h3>
                <div className="testimonial-rating">
                  {[...Array(testimonials[currentSlide].rating)].map(
                    (_, index) => (
                      <Star
                        key={index}
                        className="star-icon"
                        fill="#FFD700"
                        color="#FFD700"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-quote">
            <h2>Trích dẫn từ người dùng</h2>
            <blockquote>{testimonials[currentSlide].quote}</blockquote>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
