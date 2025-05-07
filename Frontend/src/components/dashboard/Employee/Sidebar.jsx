// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Menu } from "antd";
// import Api from "../../../Api";
// import { toast } from "react-toastify";
// import SubMenu from "antd/lib/menu/SubMenu";

// // const { SubMenu } = Menu;

// function Sidebar({ collapsed }) {
//   const onClick = (e) => {
//     console.log("click ", e);
//   };

//   const role = localStorage.getItem("name");
//   const id = localStorage.getItem("id");
//   const [employee, setEmployee] = useState();
//   const service = employee?.services || [];

//   useEffect(() => {
//     getemployee();
//   }, []);

//   const getemployee = async () => {
//     try {
//       const response = await Api.get(`signup/getby/${id}`);
//       setEmployee(response.data);
//       console.log("response", response);
//     } catch (error) {
//       console.error("Error fetching employee list:", error);
//       toast.error("Failed to fetch employee list.");
//     }
//   };

//   const menuItems = [
//     { serviceName: "LoanEmployee", label: "Loan Management", path: "/employee/loanmanagement" },
//     { serviceName: "InsuranceEmployee", label: "Insurance Management", path: "/employee/insurancemanagement" },
//     { serviceName: "TaxEmployee", label: "Tax Management", path: "/employee/taxmanagement" },
//     { serviceName: "stockMarket", label: "Stock Market", path: "/employee/stockmarket" },
//   ];

//   return (
//     <div className={collapsed ? "sidebarcontent open" : "d-none"}>
//       <Menu onClick={onClick} mode="inline" className="nav-list">
//         <NavLink to="/employee" className="main-nav-style" style={{ marginTop: "70px" }}>
//           Dashboard
//         </NavLink>
//         <NavLink to="/employee/myprofile">My Profile</NavLink>
//         <NavLink to="/employee/leadmanagement">Lead Generation</NavLink>

//         <SubMenu title="Task Management" ClassName="main-nav-style" >
//             <NavLink to="/employee/loantaskmanagement" >Loan Task</NavLink>
//             <NavLink to="/employee/insurancetaskmanagement">Insurance Task</NavLink>
//             <NavLink to="/employee/taxtaskmanagement">Tax Task</NavLink>
//         </SubMenu>

//         {menuItems
//           .filter((item) => service.includes(item.serviceName))
//           .map((item) => (
//             <NavLink key={item.path} to={item.path} className="main-nav-style">
//               {item.label}
//             </NavLink>
//           ))}
//       </Menu>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import Api from "../../../Api";
import { toast } from "react-toastify";
import SubMenu from "antd/lib/menu/SubMenu";
import { FaUserCircle } from "react-icons/fa";
// const { SubMenu } = Menu;

function Sidebar({ collapsed }) {
  const onClick = (e) => {
    console.log("Click Event: ", e);
  };

  const id = localStorage.getItem("id");
  const [empno, setEmployeeno] = useState("");
  const [firstname, setFirstname] = useState("");
  const [employee, setEmployee] = useState(null);
  const service = employee?.services || [];

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    try {
      const response = await Api.get(`signup/getby/${id}`);
      setEmployee(response.data);
      setFirstname(response.data.firstname);
      setEmployeeno(response.data.empno);
      console.log("Employee Data:", response);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Failed to fetch employee data.");
    }
  };

  // Define menu items with respective service names
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
      label: "Stock Market",
      path: "/employee/stockmarket",
    },
  ];
  const ReportingManagerItems = [
    // {
    //   serviceName: "ReportingManager",
    //   label: "Area Manager List",
    //   path: "/employee/areamangerdetails",
    // },
    {
      serviceName: "ReportingManager",
      label: "Loan Application",
      path: "/employee/loanmanagement",
    },
    {
      serviceName: "ReportingManager",
      label: "Insurance Application",
      path: "/employee/insurancemanagement",
    },
    {
      serviceName: "ReportingManager",
      label: "Tax Application",
      path: "/employee/taxmanagement",
    },
    
  ];

  // const salesMangerItems = [
  //   {
  //     serviceName: "SalesManager",
  //     label: "Loan Management",
  //     path: "/employee/loanmanagement",
  //   },
  //   {
  //     serviceName: "SalesManager",
  //     label: "Insurance Management",
  //     path: "/employee/insurancemanagement",
  //   },
  //   {
  //     serviceName: "SalesManager",
  //     label: "Tax Management",
  //     path: "/employee/taxmanagement",
  //   },
  // ];

  // Define task-related menu items
  const taskMenuItems = [
    {
      serviceName: "LoanEmployee",
      label: "Loan Services",
      path: "/employee/loantaskmanagement",
    },
    {
      serviceName: "InsuranceEmployee",
      label: "Insurance Services",
      path: "/employee/insurancetaskmanagement",
    },
    {
      serviceName: "TaxEmployee",
      label: "Tax Services",
      path: "/employee/taxtaskmanagement",
    },
    {
      serviceName: "stockMarket",
      label: "Stock Market",
      path: "/employee/stockmarket",
    },
  ];
  const managementMenuItems = [
    {
      serviceName: "ReportingManager",
      label: "Loan Services",
      path: "/employee/salesloanmangement",
    },
    {
      serviceName: "ReportingManager",
      label: "Insurance Services",
      path: "/employee/salesinsurancenmangement",
    },
    {
      serviceName: "ReportingManager",
      label: "Tax Services",
      path: "/employee/salestaxmangement",
    },
    // {
    //   serviceName: "SalesManager",
    //   label: "Stock Management",
    //   path: "/employee/stockmarket",
    // },
  ];
  // Check if the employee has task-related services
  const hasTasks = taskMenuItems.some((task) =>
    service.includes(task.serviceName)
  );
  const hasManagement = managementMenuItems.some((task) =>
    service.includes(task.serviceName)
  );

  return (
    <div className={collapsed ? "sidebarcontent open" : "d-none"}>
      <Menu onClick={onClick} mode="inline" className="nav-list">
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            <FaUserCircle style={{ fontSize: "28px", color: "#1890ff" }} />
            <span>hi, {firstname}!</span>
          </h3>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#666",
              marginTop: "5px",
            }}
          >
            {empno}
          </h3>
        </div>

        <NavLink
          to="/employee"
          className="main-nav-style"
          style={{ marginTop: "30px" }}
        >
          Dashboard
        </NavLink>

        <NavLink to="/employee/myprofile" ClassName="main-nav-style">
          My Profile
        </NavLink>
        <NavLink to="/employee/leadmanagement" ClassName="main-nav-style">
          My Leads 
        </NavLink>
        {/* 
        {salesMangerItems
          .filter((item) => service.includes(item.serviceName))
          .map((item) => (
            <NavLink key={item.path} to={item.path} className="main-nav-style">
              {item.label}
            </NavLink>
          ))} */}

        {hasManagement && (
          <SubMenu title="My Tasks" className="main-nav-style">
            {managementMenuItems
              .filter((task) => service.includes(task.serviceName))
              .map((task) => (
                // <Menu.Item key={task.path}>
                <NavLink to={task.path}>{task.label}</NavLink>
                //  </Menu.Item>
              ))}
               <NavLink to="/employee/leadtaskmanagement" ClassName="main-nav-style">
          Lead Task
        </NavLink>
          </SubMenu>
        )}
         <SubMenu title="My Applications" className="main-nav-style">
        {ReportingManagerItems.filter((item) =>
          service.includes(item.serviceName)
        ).map((item) => (
          <NavLink key={item.path} to={item.path} className="main-nav-style">
            {item.label}
          </NavLink>
        ))}
        </SubMenu>
        {/* Conditionally render Task Management submenu */}
        {hasTasks && (
          <SubMenu title="Task Management" className="main-nav-style">
            {taskMenuItems
              .filter((task) => service.includes(task.serviceName))
              .map((task) => (
                // <Menu.Item key={task.path}>
                <NavLink to={task.path}>{task.label}</NavLink>
                //  </Menu.Item>
              ))}
          </SubMenu>
        )}
       
       

        {/* Render dynamic menu items based on assigned services */}
        
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
