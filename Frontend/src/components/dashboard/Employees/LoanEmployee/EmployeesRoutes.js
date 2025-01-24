import CreateLead from "./CreateLead";
import EmployeesDashboard from "./Dashboard";
import LoanDetails from "./LoanDetails";
import LoanManagements from "./LoanManagements";
import TabsProfile from "./ProfileTabs";
import LoanLeadManagement from "./LoanLeadManagement";
import LoanLeadDetails from "./LoanLeadDetails";
import LoanTaskManagement from "./LoanTaskManagement";
import LoanTaskDetails from "./LoanTaskDetails";
import LeadTask from "./LeadTask";
import LeadTaskDetails from"./LeadTaskDetails";

const roles = localStorage.getItem("userType");

export const LoanEmployeesRoutes = [
  { path: "", element: <EmployeesDashboard /> },
  { path: "myprofile", element: <TabsProfile /> },
  { path: "loanmanagement", element: <LoanManagements /> },
  { path: "leadmanagement", element: <LoanLeadManagement /> },
  { path: "leaddetails", element: <LoanLeadDetails /> },
  { path: "/loanEmp/createlead", element: <CreateLead /> },
  { path: "/loanEmp/loandetails/:id", element: <LoanDetails /> },
  { path: "/loanEmp/loanTaskdetails/:id", element: <LoanTaskDetails /> },
  { path: "loantaskmanagement", element: <LoanTaskManagement /> },
  { path: "leadtask", element: <LeadTask /> },
  { path: "/loanEmp/leadtaskdetails/:id", element: <LeadTaskDetails /> },
];
