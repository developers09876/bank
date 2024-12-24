import LoanManagement from "../LoanManagement";
import CreateLead from "./CreateLead";
import LoanDashboard from "./LoanDashboard";
import LoanLeadManagement from "./LoanLeadManagement";

export const LoanAdminRoutes = [
  { path: "", element: <LoanDashboard /> },
  { path: "loanmanagement", element: <LoanManagement /> },
  { path: "leadmanagement", element: <LoanLeadManagement /> },
  { path: "/adminLoan/createlead", element: <CreateLead /> },
];
