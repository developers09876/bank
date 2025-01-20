import TaxDashboard from "../TaxAdmin/TaxDashboard";
import TaxManagements from "../TaxAdmin/TaxManagements";
import TaxUserList from "../TaxAdmin/TaxUserList";
import AddEmployee from "./AddEmployee";
import CreateLead from "./CreateLead";
import EmployeeList from "./EmployeeList";
import TabsProfile from "./ProfileTabs";
import TaxLeaddetails from "./TaxLeaddetails";
import TaxLeadManagement from "./TaxLeadManagement";
export const TaxAdminRoutes = [
    { path: "", element: <TaxDashboard /> },
    { path: "myprofile", element: <TabsProfile /> }, 
    { path: "taxmanagement", element: <TaxManagements /> },
    { path: "taxuserlist", element: <TaxUserList /> },
  { path: "/employeeTax/createlead", element: <CreateLead /> },
  { path: "leadmanagement", element: <TaxLeadManagement /> },
  { path: "leaddetails", element: <TaxLeaddetails /> },
  { path: "employeeTable", element: <EmployeeList /> },
  { path: "/employeeTax/addEmployee", element: <AddEmployee /> },
  ];