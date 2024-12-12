import { Navigate } from "react-router-dom";
import InsuranceReview from "./InsuranceReview";
import TaxReview from "./TaxReview";

const roles = localStorage.getItem("userType");
export const EmployeeRoutes = [
  {
    path: "/employee",
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
];
