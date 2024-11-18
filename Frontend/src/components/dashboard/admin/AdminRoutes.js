import AdminDashboard from "./dashboard";
import EmployeeList from "./EmployeeList";
import UserList from "./UserList";

export const AdminRoutes = [
    { path: "", element: <AdminDashboard /> },
    { path: "userlist", element: <UserList /> },
    { path: "employeelist", element: <EmployeeList /> },

    // { path: "insurance", element: <InsuranceReview /> },
  ];