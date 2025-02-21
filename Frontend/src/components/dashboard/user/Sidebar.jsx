// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Menu } from "antd";
// import axios from "axios";

// function Sidebar({ collapsed }) {
//   const [firstname, setfirstname] = useState("");
//   const id = localStorage.getItem("id");
//   useEffect(() => {
//     const fetchUserData = async () => {
//        {
//         try {
//           const response = await axios.get(`http://localhost:5000/signup/getby/${id}`);
//           setfirstname (`${response.data.firstname} ${response.data.lastname}`)
//             console.log ( "response.data", response.data.firstname)
//         } catch (error) {
//           console.error("Error fetching user data", error);
//         }
//       }
//     };
//     fetchUserData();

//   }, [id]);

//   return (
//     <div className={collapsed === true ? "sidebarcontent open" : "d-none"}>
//       <Menu mode="inline" className="nav-list">
//         <h3 style={{marginTop:"100px",textAlign:"center"}}>Hi, {firstname}!</h3>
//         <NavLink to="/user" className="main-nav-style" style={{ marginTop: "50px" }}>
//           My Profile
//         </NavLink>
//         <NavLink to="/user/rewards" className="main-nav-style">
//           My Income
//         </NavLink>
//         <NavLink to="/user/loanstatus" className="main-nav-style">
//           Loan
//         </NavLink>
//         <NavLink to="/user/insu" className="main-nav-style">
//           Insurance
//         </NavLink>
//         <NavLink to="/user/tax" className="main-nav-style">
//           Tax
//         </NavLink>
//         <NavLink to="/user/feedback" className="main-nav-style">
//           Feedback
//         </NavLink>
//       </Menu>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Modal, Avatar } from "antd";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

function Sidebar({ collapsed }) {
  const [firstname, setFirstname] = useState("");
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/signup/getby/${id}`
        );
        setFirstname(response.data.firstname);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, [id]);

  return (
    <div className={collapsed ? "sidebarcontent open" : "d-none"}>
      <Menu mode="inline" className="nav-list">
        <h3
          style={{
            marginTop: "45px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            // marginRight:"100px"
          }}
        >
          <FaUserCircle style={{ fontSize: "28px", color: "#1890ff" }} />
          Welcome, {firstname}!
        </h3>

        <NavLink
          to="/user"
          className="main-nav-style"
          style={{ marginTop: "20px" }}
        >
          My Profile
        </NavLink>
        <NavLink to="/user/rewards" className="main-nav-style">
          My Income
        </NavLink>
        <NavLink to="/user/loanstatus" className="main-nav-style">
          Loan
        </NavLink>
        <NavLink to="/user/insu" className="main-nav-style">
          Insurance
        </NavLink>
        <NavLink to="/user/tax" className="main-nav-style">
          Tax
        </NavLink>
        <NavLink to="/user/feedback" className="main-nav-style">
          Feedback
        </NavLink>
      </Menu>
    </div>
  );
}

export default Sidebar;
