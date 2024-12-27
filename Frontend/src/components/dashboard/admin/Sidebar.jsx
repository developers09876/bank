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

        <NavLink to="/admin/userlist" ClassName="main-nav-style">
          {/* <MdAreaChart className="Nav-Icon" /> */}
          UserList
        </NavLink>
        <NavLink to="/admin/employeelist" ClassName="main-nav-style">
          {/* <MdAreaChart className="Nav-Icon" /> */}
          EmployeeList
        </NavLink>
        {/* <NavLink to="/admin/createjobform" className="main-nav-style">Job Post</NavLink> */}

        <SubMenu
          // icon={<AiFillProject size={20} className="Nav-Icon1" />}
          title="Career"
        >
          <NavLink to="/admin/createjobform">
            {/* <MdRequestPage className="Nav-Icon" /> */}
            create job
          </NavLink>
          <NavLink to="/admin/jobrequest">
            {/* <MdSend className="Nav-Icon" /> */}
            job request
          </NavLink>
        </SubMenu>
        <SubMenu
          // icon={<AiFillProject size={20} className="Nav-Icon1" />}
          title="Management"
        >
          <NavLink to="/admin/loanmanagement">
            {/* <MdRequestPage className="Nav-Icon" /> */}
            Loan Management
          </NavLink>
          <NavLink to="/employeeInsurance">
            {/* <MdSend className="Nav-Icon" /> */}
            Insurance Management
          </NavLink>
          <NavLink to="/employeeTax">
            {/* <MdSend className="Nav-Icon" /> */}
            Tax Management
          </NavLink>
        </SubMenu>
        <NavLink
          to="/admin/leadgeneration"
          ClassName="main-nav-style"
          // style={{ marginTop: "70px" }}
        >
          {/* <MdAreaChart className="Nav-Icon" /> */}
          Lead  Generation
        </NavLink>
      </Menu>
    </div>
  );
}

export default Sidebar;
