import LoanDashboard from "./LoanDashboard";
import LoanManagement from "../LoanManagement";
import EmployeeList from "../EmployeeList";
import CreateJobForm from "../createJobform";

export const LoanAdminRoutes = [
  { path: "", element: <LoanDashboard /> },
  { path: "loanmanagement", element: <LoanManagement /> },
  { path: "employeelist", element: <EmployeeList /> },
  { path: "createjobform", element: <CreateJobForm /> },
];
