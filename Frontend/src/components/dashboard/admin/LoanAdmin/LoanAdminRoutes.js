import LoanManagement from "../LoanAdmin/LoanManagements";
import CreateLead from "./CreateLead";
import LoanDashboard from "./LoanDashboard";
import LoanLeadManagement from "./LoanLeadManagement";
import EmployeeUserList from "./EmployeeUserList";
import TabsProfile from "./ProfileTabs";
import LoanLeadDetails from "./LoanLeadDetails";

export const LoanAdminRoutes = [
  { path: "", element: <LoanDashboard /> },
  { path: "loanmanagement", element: <LoanManagement /> },
  { path: "leadmanagement", element: <LoanLeadManagement /> },
  { path: "leaddetails", element: <LoanLeadDetails /> },
  { path: "/adminLoan/createlead", element: <CreateLead /> },
  { path: "employeeuserlist", element: <EmployeeUserList /> },
  { path: "myprofile", element: <TabsProfile /> },

];
