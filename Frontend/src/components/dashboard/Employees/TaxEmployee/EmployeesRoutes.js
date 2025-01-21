import EmployeesDashboard from "./Dashboard";
import TabsProfile from "./ProfileTabs";
import TaxManagements from "./TaxManagements";
import CreateLead from "./CreateLead";
import TaxLeadManagement from "./TaxLeadManagement";
import TaxLeaddetails from "./TaxLeaddetails";


const roles = localStorage.getItem("userType");

export const TaxEmployeesRoutes = [
  { path: "", element: <EmployeesDashboard />, },
  { path: "myprofile", element: <TabsProfile /> }, 
  { path: "taxmanagement", element: <TaxManagements /> },
  { path: "/taxEmp/createlead", element: <CreateLead /> },
  { path: "leadmanagement", element: <TaxLeadManagement /> },
  { path: "leaddetails", element: <TaxLeaddetails /> },
]
  