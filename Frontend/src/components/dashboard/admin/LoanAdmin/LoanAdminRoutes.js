import LoanManagement from "../LoanAdmin/LoanManagements";
import CreateLead from "./CreateLead";
import LoanDashboard from "./LoanDashboard";
import LoanLeadManagement from "./LoanLeadManagement";
import EmployeeUserList from "./EmployeeUserList";
import TabsProfile from "./ProfileTabs";
import TaxManagementTable from "./TaxManagementTable";
import LoanLeadDetails from "./LoanLeadDetails";
import LoanDetails from "./LoanDetails";
import LoanEmployeeList  from"./LoanEmployeeList";
import AddLoanEmployee from"./AddLoanEmployee";

export const LoanAdminRoutes = [
  { path: "", element: <LoanDashboard /> },
  { path: "loanmanagement", element: <LoanManagement /> },
  { path: "leadmanagement", element: <LoanLeadManagement /> },
  { path: "leaddetails", element: <LoanLeadDetails /> },
  { path: "/adminLoan/createlead", element: <CreateLead /> },
  { path: "employeeuserlist", element: <EmployeeUserList /> },
  { path: "TaxManagement", element: <TaxManagementTable /> },
  { path: "/adminLoan/loandetails/:id", element: <LoanDetails /> },
  { path: "/adminLoan/loanemployeelist", element: <LoanEmployeeList /> },
  { path: "/adminLoan/addloanemployee", element: <AddLoanEmployee/> },
];
