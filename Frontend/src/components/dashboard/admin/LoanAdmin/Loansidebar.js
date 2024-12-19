import React from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";

function Sidebar({ collapsed }) {
  const onClick = (e) => {
    console.log("click ", e);
  };
  const role = localStorage.getItem("name");
  const id = localStorage.getItem("regid");

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
          to="/admin"
          ClassName="main-nav-style"
          style={{ marginTop: "70px" }}
        >
          {/* <MdAreaChart className="Nav-Icon" /> */}
          Dashboard
        </NavLink>

        <NavLink to="/admin/employeelist" ClassName="main-nav-style">
          EmployeeList
        </NavLink>
        <NavLink to="/admin/createjobform" className="main-nav-style">
          Job Post
        </NavLink>
        <SubMenu title="Management">
          <NavLink to="/admin/loanmanagement">Loan Management</NavLink>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Sidebar;
