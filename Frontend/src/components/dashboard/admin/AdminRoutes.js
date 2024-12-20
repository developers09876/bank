import AddAdmin from "./AddAdmin";
import CreateJobForm from "./createJobform";
import AdminDashboard from "./dashboard";
import EmployeeList from "./EmployeeList";
import LoanDashboard from "./LoanDashboard";
import LoanManagement from "./LoanManagement";
import UserList from "./UserList";

export const AdminRoutes = [
  { path: "", element: <AdminDashboard /> },
  { path: "userlist", element: <UserList /> },
  { path: "employeelist", element: <EmployeeList /> },
  { path: "/admin/addAdmin", element: <AddAdmin /> },
  { path: "createjobform", element: <CreateJobForm />},
  { path: "loanmanagement", element: <LoanManagement />},
  { path: "loandashboard", element: <LoanDashboard/>},


  // { path: "insurance", element: <InsuranceReview /> },
];
