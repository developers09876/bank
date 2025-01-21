import TaxDashboard from "../TaxAdmin/TaxDashboard";
import TaxManagements from "../TaxAdmin/TaxManagements";
import TaxUserList from "../TaxAdmin/TaxUserList";
import AddEmployee from "./AddEmployee";
import CreateLead from "./CreateLead";
import EmployeeList from "./EmployeeList";
import TabsProfile from "./ProfileTabs";
import TaskManagements from "./TaskManagements";
import TaxLeaddetails from "./TaxLeaddetails";
import TaxLeadManagement from "./TaxLeadManagement";
import TaskManagementDetails from "./TaskManagementDetalis";
import CreateTaxManagement from "./CreateTaxManagement";

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
  { path: "/employeeTax/taskManagementdetails/:id", element: <TaskManagementDetails /> },
  { path: "taskManagement", element: <TaskManagements /> },
  { path: "createTaxMangement", element: <CreateTaxManagement /> },
  ];