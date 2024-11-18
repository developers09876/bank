import InsuranceReview from "./InsuranceReview";
import LoanDashboard from "./LoanReview";
import TaxReview from "./TaxReview";

export const EmployeeRoutes = [
  { path: "", element: <LoanDashboard /> },
  { path: "tax", element: <TaxReview /> },
  { path: "insurance", element: <InsuranceReview /> },
];
