import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineDashboardCustomize,
  MdPerson,
  MdAreaChart,
  MdMenuBook,
  MdRequestPage,
  MdDetails,
  MdSend,
} from "react-icons/md";
import { AiFillProject } from "react-icons/ai";

import { VscPersonAdd } from "react-icons/vsc";
import { FaBlogger } from "react-icons/fa";
// import "../../../Components/Css/Students/Student.scss";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
// import SubMenu from "antd/lib/menu/SubMenu";
import { SnippetsOutlined } from "@ant-design/icons";
import { FaHandPaper } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
// const { SubMenu } = Menu;

function Sidebar({ collapsed }) {
  const onClick = (e) => {
    console.log("click ", e);
  };
  const role = localStorage.getItem("username");


  return (
    <div className={collapsed === true ? "sidebarcontent open" : "d-none"}>
      <Menu onClick={onClick} mode="inline" className="nav-list">
        <NavLink to="" activeClassName="main-nav-style">
          <div className="Nav-Icon2">
            <CgProfile />
          </div>
          
          <div className="name-tag">{role}</div>
        </NavLink>
       
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
        <NavLink to="/employee" ClassName="main-nav-style">
          {/* <MdAreaChart className="Nav-Icon" /> */}
          Loan Application Review
        </NavLink>

        {/* <SubMenu
          icon={<AiFillProject size={20} className="Nav-Icon1" />}
          title="Jobs"
        >
          <NavLink to="/professional/jobs">
            <MdRequestPage className="Nav-Icon" />
            Jobs
          </NavLink>
          <NavLink to="/professional/jobrequests">
            <MdSend className="Nav-Icon" />
            Request
          </NavLink>
          <NavLink to="/professional/jobrequest">
            <MdSend className="Nav-Icon" />
            Response
          </NavLink>
        </SubMenu> */}

        

        <NavLink to="/employee/tax" ClassName="main-nav-style">
          {/* <MdAreaChart className="Nav-Icon" /> */}
          Tax Application Review

        </NavLink>
        
        <NavLink to="/employee/insurance" ClassName="main-nav-style">
          {/* <MdMenuBook className="Nav-Icon" /> */}
          Insurance  Review

        </NavLink>
 
      </Menu>
    </div>
  );
}

export default Sidebar;