import { Navigate } from "react-router-dom";
import InsuranceReview from "./InsuranceReview";
import LoanDashboard from "./LoanReview";
import TaxReview from "./TaxReview";

const role = localStorage.getItem("userType")
export const EmployeeRoutes = [
  { path: "", element:  role === "employee" ? <LoanDashboard /> : <Navigate to="/login" /> },
  { path: "tax", element:  role === "employee" ? <TaxReview /> : <Navigate to="/login" /> },
  { path: "insurance", element:  role === "employee" ? <InsuranceReview /> : <Navigate to="/login" /> },
];
