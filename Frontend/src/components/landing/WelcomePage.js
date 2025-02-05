import React from "react";
import "./WelcomePage.css";
import { Col, Row } from "react-bootstrap";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const userType = localStorage.getItem("userType");
  const referType = localStorage.getItem("referType"); // Ensure correct variable name

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

  return (
    <div>
      <Header />
      <div className="refer-parent">
        <div className="refer-container">
          <div className="refer-card">
            <Row className="refer-firstrow px-5 py-2">
              <Col
                className="refer-firstcol px-1 py-2"
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <div className="referral-left animate-slide-in-left">
                  <h1 className="refer-heading">
                    Welcome to Our <br /> Villu genius Family
                  </h1>
                </div>
              </Col>
              <Col
                className="refer-secondcol px-3 py-2"
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/business-agreement-illustration-download-in-svg-png-gif-file-formats--conference-deal-partners-aggrement-and-shaking-hands-pack-illustrations-3685784.png" />
              </Col>
            </Row>
            <div className="refer-svgpath">
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
