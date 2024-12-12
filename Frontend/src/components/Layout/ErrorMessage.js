import React from "react";
import { Link } from "react-router-dom";
// import "../../Components/Css/login.css";
import Error from "../Images/404error.png"
import { Button } from "antd";

function ErrorMessage() {
  return (
    <div className="error_main">
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}
      >
        <div>
          <img src={Error} size={20}></img>
        </div>
      </div>
      <br />
      <div className="error_text">
        <div>
         <center><h1>
            <span style={{ color: "#da3450" }}>OOPS ! </span>PAGE NOT BE FOUND
          </h1></center> 
        
        </div>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button style={{ backgroundColor: "#da3450" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Go to Home Page
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ErrorMessage;
