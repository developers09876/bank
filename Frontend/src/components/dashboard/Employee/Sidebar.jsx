import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import Api from "../../../Api";
import { useState } from "react";
import { toast } from "react-toastify";

function Sidebar({ collapsed }) {
  const onClick = (e) => {
    console.log("click ", e);
  };
  const id = localStorage.getItem("id");
  const [employee, setEmployee] = useState();

  const service = employee?.services || [];
  console.log("service", service);
  useEffect(() => {
    getemployee();
  }, []);
  const getemployee = async () => {
    try {
      const response = await Api.get(`signup/getby/${id}`);
      setEmployee(response.data);
      console.log("response", response);
    } catch (error) {
      console.error("Error fetching employee list:", error);
      toast.error("Failed to fetch employee list.");
    }
  };

  const menuItems = [
    {
      serviceName: "LoanEmployee",
      label: "Loan Management",
      path: "/employee/loanmanagement",
    },
    {
      serviceName: "InsuranceEmployee",
      label: "Insurance Management",
      path: "/employee/insurancemanagement",
    },
    {
      serviceName: "TaxEmployee",
      label: "Tax Management",
      path: "/employee/taxmanagement",
    },
    {
      serviceName: "stockMarket",
      label: "stock Market",
      path: "/employee/taxmanagement",
    },
  ];

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
          to="/employee"
          ClassName="main-nav-style"
          style={{ marginTop: "70px" }}
        >
          Dashboard
        </NavLink>
        <NavLink to="/employee/myprofile">My Profile</NavLink>

        <NavLink to="/employee/leadmanagement">Lead Generation</NavLink>
        <NavLink to="/employee/taskmanagement">Task Management</NavLink>
        {menuItems
          .filter((item) => service.includes(item.serviceName))
          .map((item) => (
            <NavLink key={item.path} to={item.path} className="main-nav-style">
              {item.label}
            </NavLink>
          ))}
        {/* <NavLink to="/user/leadgeneration" ClassName="main-nav-style">
          Lead Generation
        </NavLink> */}
      </Menu>
    </div>
  );
}

export default Sidebar;
