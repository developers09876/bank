import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";

function Sidebar({ collapsed }) {
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div className={collapsed === true ? "sidebarcontent open" : "d-none"}>
      <Menu onClick={onClick} mode="inline" className="nav-list">
        {/* <NavLink
          to="/professional/professionalprofile"
          ClassName="main-nav-style"
        >
          <MdPerson className="Nav-Icon" />
          My profile
        </NavLink> */}
        {/* <SubMenu
          icon={<AiFillProject size={20} className="Nav-Icon1" />}
          title="Freelancing"
        > */}

        {/* </SubMenu> */}
        <NavLink
          to="/employeeTax"
          ClassName="main-nav-style"
          style={{ marginTop: "70px" }}
        >
          {/* <MdAreaChart className="Nav-Icon" /> */}
          Dashboard
        </NavLink>
        <NavLink to="myprofile">
          {/* <MdSend className="Nav-Icon" /> */}
          My Profile
        </NavLink>
        <NavLink to="taxmanagement">
          {/* <MdSend className="Nav-Icon" /> */}
          Tax Management
        </NavLink>
        <NavLink to="leadmanagement">
          {/* <MdSend className="Nav-Icon" /> */}
          Lead Generation
        </NavLink>
      </Menu>
    </div>
  );
}

export default Sidebar;
