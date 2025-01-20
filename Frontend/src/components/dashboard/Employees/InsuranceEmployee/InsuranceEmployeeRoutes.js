import InsuranceEmployeeDashboard from "./InsuranceEmployeeDashboard";
import MyProfile from "./MyProfile";
import InsuranceManagement from"./InsuranceManagement";
import InsuranceLeadManagement from "./InsuranceLeadManagement";
const roles = localStorage.getItem("userType");

export const InsuranceEmployeeRoutes = [
  {path: "/insuranceEmply",element: <InsuranceEmployeeDashboard  />,},
  { path: "myprofile", element: <MyProfile /> },
  { path: "insurancemanagement", element: <InsuranceManagement /> },
  { path: "insuranceleadmanagement", element: <InsuranceLeadManagement /> },
//   { path: "leaddetails", element: <LoanLeadDetails /> },
//   { path: "/loanEmp/createlead", element: <CreateLead /> },
//   { path: "/loanEmp/loandetails/:id", element: <LoanDetails /> },
]
  