import AddAdmin from "./AddAdmin";
import CreateJobForm from "./createJobform";
import AdminDashboard from "./dashboard";
import EmployeeList from "./EmployeeList";
import JobRequest from "./JobRequest";
import Loancards from "./Loancards";
import LoanManagement from "./LoanManagement";
import LoanStatus from "./LoanStatus";
import UserList from "./UserList";

export const AdminRoutes = [
  { path: "", element: <AdminDashboard /> },
  { path: "userlist", element: <UserList /> },
  { path: "employeelist", element: <EmployeeList /> },
  { path: "/admin/addAdmin", element: <AddAdmin /> },
  { path: "createjobform", element: <CreateJobForm /> },
  { path: "jobrequest", element: <JobRequest /> },
  { path: "loanmanagement", element: <LoanManagement /> },
  { path: "loancards", element: <Loancards /> },
  { path: "loanstatus", element: <LoanStatus /> },


  // { path: "insurance", element: <InsuranceReview /> },
];
