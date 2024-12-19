import TaxDashboard from "./TaxDashboard";
import LoanManagement from "../LoanManagement";
import EmployeeList from "../EmployeeList";
import CreateJobForm from "../createJobform";
export const TaxAdminRoutes = [
    { path: "", element: <TaxDashboard /> },
    { path: "loanmanagement", element: <LoanManagement /> },
    { path: "employeelist", element: <EmployeeList /> },
    { path: "createjobform", element: <CreateJobForm /> },
  ];