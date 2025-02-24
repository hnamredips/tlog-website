import React from "react";
import Pitching from "../../assets/Pitching Desk.png";
import "./Founders.css";

const Founders = () => {
  const founders = [
    { name: "Ông Lê Đại Quyền", position: "CEO" },
    { name: "Ông Nguyễn Hải Nam", position: "CTO" },
    { name: "Bà Đặng Thị Mỹ Á", position: "CFO" },
    { name: "Bà Trần Diễm Vân Nhi", position: "CSO" },
    { name: "Bà Lê Thị Nguyên Quỳnh", position: "CMO" },
    { name: "Bà Mai Huỳnh Kim Thy", position: "CINO" },
  ];

  return (
    <div>
      <section className="founders">
        {/* <h2>Những nhà sáng lập</h2>
        <div className="founders-grid">
          {founders.map((founder, index) => (
            <div key={index} className="founder">
              <img src={`https://via.placeholder.com/100`} alt={founder.name} />
              <h3>{founder.name}</h3>
              <p>{founder.position}</p>
            </div>
          ))}
        </div> */}
        <img src={Pitching} alt="Pitching Desk" />
      </section>
    </div>
  );
};

export default Founders;
