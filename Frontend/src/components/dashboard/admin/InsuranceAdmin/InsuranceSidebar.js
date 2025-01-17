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
          to="/employeeInsurance"
          ClassName="main-nav-style"
          style={{ marginTop: "70px" }}
        >
          Dashboard
        </NavLink>
        <NavLink to="myprofile"> My Profile</NavLink>
        <NavLink to="insurancemanagement"> Insurance Management</NavLink>
        <NavLink to="leadmanagement"> Lead Generation</NavLink>
        <NavLink to="insuranceemployeelist">Employee List</NavLink>
      </Menu>
    </div>
  );
}

export default Sidebar;
