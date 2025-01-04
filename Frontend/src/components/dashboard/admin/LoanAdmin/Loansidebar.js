import React from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";

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
          to="/adminLoan"
          ClassName="main-nav-style"
          style={{ marginTop: "70px" }}
        >
          Dashboard
        </NavLink>
        <NavLink to="/adminLoan/myprofile">My Profile</NavLink>


        <NavLink to="/adminLoan/loanmanagement">Loan Management</NavLink>

        <NavLink to="/adminLoan/leadmanagement">Lead Generation</NavLink>
      </Menu>
    </div>
  );
}

export default Sidebar;
