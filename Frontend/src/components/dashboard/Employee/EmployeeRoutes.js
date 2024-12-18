import { Navigate } from "react-router-dom";
import InsuranceReview from "./InsuranceReview";
import TaxReview from "./TaxReview";
import EmployeeDashboard from "./Dashboard";
import LeadGeneration from "./LeadGeneration";

const roles = localStorage.getItem("userType");
export const EmployeeRoutes = [
  {
    path: "/employee",
    element: <EmployeeDashboard />,
  },
  {
    path: "/employee/loan",
    element: <TaxReview />,
  },
  {
    path: "/employee/tax",
    element: roles === "employee" ? <TaxReview /> : <Navigate to="/login" />,
  },
  {
    path: "/employee/insurance",
    element:
      roles === "employee" ? <InsuranceReview /> : <Navigate to="/login" />,
  },
  {
    path: "/employee/lead",
    element:
      roles === "employee" ? <LeadGeneration /> : <Navigate to="/login" />,
  },
];
