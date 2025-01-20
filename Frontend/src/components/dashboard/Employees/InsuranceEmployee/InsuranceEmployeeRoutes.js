import InsuranceEmployeeDashboard from "./InsuranceEmployeeDashboard";

const roles = localStorage.getItem("userType");

export const InsuranceEmployeeRoutes = [
  {
    path: "/insuranceEmply",
    element: <InsuranceEmployeeDashboard  />,
  },
]
  