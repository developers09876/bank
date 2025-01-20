import EmployeesDashboard from "./Dashboard";

const roles = localStorage.getItem("userType");
export const EmployeesRoutes = [
  {
    path: "",
    element: <EmployeesDashboard />,
  },
]
  