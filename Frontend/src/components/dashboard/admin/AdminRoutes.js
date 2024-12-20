import AddAdmin from "./AddAdmin";
import CreateJobForm from "./createJobform";
import AdminDashboard from "./dashboard";
import EmployeeList from "./EmployeeList";
import Loancards from "./Loancards";
import LoanDashboard from "./LoanDashboard";
import LoanManagement from "./LoanManagement";
import LoanStatus from "./LoanStatus";
import UserList from "./UserList";

export const AdminRoutes = [
  { path: "", name: "", element: <AdminDashboard /> },
  { path: "userlist", element: <UserList /> },
  { path: "employeelist", element: <EmployeeList /> },
  { path: "/admin/addAdmin", element: <AddAdmin /> },
  { path: "createjobform", element: <CreateJobForm /> },
  { path: "loanmanagement", element: <LoanManagement /> },
  { path: "loancards", element: <Loancards /> },
  { path: "loanstatus", element: <LoanStatus /> },
  { path: "loandashboard", element: <LoanDashboard /> },

  // { path: "insurance", element: <InsuranceReview /> },
];
