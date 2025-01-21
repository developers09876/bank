import CreateLead from "./CreateLead";
import EmployeesDashboard from "./Dashboard";
import LoanDetails from "./LoanDetails";
import LoanManagements from "./LoanManagements";
import TabsProfile from "./ProfileTabs";
import LoanLeadManagement from "./LoanLeadManagement";
import LoanLeadDetails from "./LoanLeadDetails";


const roles = localStorage.getItem("userType");

export const LoanEmployeesRoutes = [
  { path: "", element: <EmployeesDashboard />, },
  { path: "myprofile", element: <TabsProfile /> },
  { path: "loanmanagement", element: <LoanManagements /> },
  { path: "leadmanagement", element: <LoanLeadManagement /> },
  { path: "leaddetails", element: <LoanLeadDetails /> },
  { path: "/loanEmp/createlead", element: <CreateLead /> },
  { path: "/loanEmp/loandetails/:id", element: <LoanDetails /> },
]
  