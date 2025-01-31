import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import Api from "../../../Api";
import { toast } from "react-toastify";
import SubMenu from "antd/lib/menu/SubMenu";

// const { SubMenu } = Menu;

function Sidebar({ collapsed }) {
  const onClick = (e) => {
    console.log("click ", e);
  };

  const role = localStorage.getItem("name");
  const id = localStorage.getItem("id");
  const [employee, setEmployee] = useState();
  const service = employee?.services || [];

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
    { serviceName: "LoanEmployee", label: "Loan Management", path: "/employee/loanmanagement" },
    { serviceName: "InsuranceEmployee", label: "Insurance Management", path: "/employee/insurancemanagement" },
    { serviceName: "TaxEmployee", label: "Tax Management", path: "/employee/taxmanagement" },
    { serviceName: "stockMarket", label: "Stock Market", path: "/employee/stockmarket" },
  ];

  return (
    <div className={collapsed ? "sidebarcontent open" : "d-none"}>
      <Menu onClick={onClick} mode="inline" className="nav-list">
        <NavLink to="/employee" className="main-nav-style" style={{ marginTop: "70px" }}>
          Dashboard
        </NavLink>
        <NavLink to="/employee/myprofile">My Profile</NavLink>
        <NavLink to="/employee/leadmanagement">Lead Generation</NavLink>

        <SubMenu title="Task Management" ClassName="main-nav-style" >
            <NavLink to="/employee/loantaskmanagement" >Loan Task</NavLink>
            <NavLink to="/employee/insurancetaskmanagement">Insurance Task</NavLink>
            <NavLink to="/employee/taxtaskmanagement">Tax Task</NavLink>
        </SubMenu>

        {menuItems
          .filter((item) => service.includes(item.serviceName))
          .map((item) => (
            <NavLink key={item.path} to={item.path} className="main-nav-style">
              {item.label}
            </NavLink>
          ))}
      </Menu>
    </div>
  );
}

export default Sidebar;
