import { Navigate } from "react-router-dom";
import InsuranceReview from "./InsuranceReview";
import TaxReview from "./TaxReview";
import EmployeeDashboard from "./Dashboard";
import LeadGeneration from "./LeadGeneration";

import TabsProfile from "./ProfileTabs";
import Dashboard from "./Dashboard";
import LeadManagement from "./LeadManagement";
import LeadDetails from "./LeadDetails";
import CreateLead from "./CreateLead";
import TaskManagement from "./TaskManagement";
import LoanManagements from "./LoanManagement";
import LoanDetails from "./LoanDetails";

const roles = localStorage.getItem("userType");
export const EmployeeRoutes = [
  {
    path: "/employee",
    element: <Dashboard />,
  },
  {
    path: "/employee/myprofile",
    element: <TabsProfile />,
  },
  {
    path: "/employee/leadmanagement",
    element:  <LeadManagement /> 
  },
  {
    path: "/employee/leaddetails",
    element:
       <LeadDetails /> 
  },
  {
    path: "/employee/createlead",
    element:
       <CreateLead /> 
  },
  {
    path: "/employee/taskmanagement",
    element:
       <TaskManagement /> 
  },
  {
    path: "/employee/loanmanagement",
    element:
       <LoanManagements /> 
  },
  {
    path: "/employee/loandetails",
    element:
       <LoanDetails /> 
  },
];
