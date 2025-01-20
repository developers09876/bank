import EmployeesDashboard from "./Dashboard";

const roles = localStorage.getItem("userType");

export const LoanEmployeesRoutes = [
  {
    path: "",
    element: <EmployeesDashboard />,
  },
]
  