import React, { useEffect, useState } from "react";
import "./WelcomePage.css";
import { Col, Row } from "react-bootstrap";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useNavigate } from "react-router-dom";
// import welcomepage from '../../Images/welcome-page.png';

const WelcomePage = () => {
  const userType = localStorage.getItem("userType");
  const referType = localStorage.getItem("referType");
  const [greetings, setGreetings] = useState();

  const navigate = useNavigate();

  setTimeout(() => {
    const routes = {
      employee: "/employee",
      user: "/user",
    };

    const routesss = {
      Loans: "/loanform",
      Insurance: "/insuranceForms",
    };

    const route = routesss[referType] || routes[userType] || "/login";

    navigate(route);
  }, 3000);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreetings("Good Morning! ☀️");
    } else if (currentHour < 18) {
      setGreetings("Good Afternoon! 🌤️");
    } else {
      setGreetings("Good Evening! 🌙");
    }
  });
  return (
    <div>
      <Header />
      <div className="welcome-parent">
        <div className="welcome-container">
          <div className="welcome-card">
            <Row className="welcome-firstrow px-5 py-2">
              <Col
                className="welcome-firstcol px-1 py-2"
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <div className="welcomes-left animate-slide-in-left">
                  <h1 className="welcome-greetheading">{greetings}</h1>
                  <h1 className="welcome-heading">
                    Welcome to <br /> Vilu Genius Family
                  </h1>
                </div>
              </Col>
              <Col
                className="welcome-secondcol px-3 py-2"
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/business-agreement-illustration-download-in-svg-png-gif-file-formats--conference-deal-partners-aggrement-and-shaking-hands-pack-illustrations-3685784.png" />
                {/* <img src={welcomepage} alt="Welcome" /> */}
              </Col>
            </Row>
            <div className="welcome-svgpath">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 650 300"
                preserveAspectRatio="none"
                className="svg-path"
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="50%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 650 0 L 650 300 L 225 300 Q 235 200 295 180 C 395 130 310 80 445 0 L 650 0 Z"
                  fill="url(#gradient)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
