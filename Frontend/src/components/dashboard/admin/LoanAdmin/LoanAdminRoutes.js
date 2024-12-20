import LoanDashboard from "./LoanDashboard";
import LoanManagement from "./LoanManagements";

export const LoanAdminRoutes = [
  { path: "", element: <LoanDashboard /> },
  { path: "loanmanagement", element: <LoanManagement /> },
];
