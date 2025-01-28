import EmployeesDashboard from "./Dashboard";
import TabsProfile from "./ProfileTabs";
import TaxManagements from "./TaxManagements";
import CreateLead from "./CreateLead";
import TaxLeadManagement from "./TaxLeadManagement";
import TaxLeaddetails from "./TaxLeaddetails";
import TaxTaskManagement from "./TaxTaskManagement";
import Taxmangement from "./CreateTaxManagement";
import TaxViewDetails from "./TaxViewDetails";


const roles = localStorage.getItem("userType");

export const TaxEmployeesRoutes = [
  { path: "", element: <EmployeesDashboard />, },
  { path: "myprofile", element: <TabsProfile /> }, 
  { path: "taxmanagement", element: <TaxManagements /> },
  { path: "/taxEmp/createlead", element: <CreateLead /> },
  { path: "leadmanagement", element: <TaxLeadManagement /> },
  { path: "leaddetails", element: <TaxLeaddetails /> },
  { path: "taxtaskManagement", element: <TaxTaskManagement /> },
  { path: "addtaxManagement", element: <Taxmangement /> },
  { path: "viewtax/:id", element: <TaxViewDetails /> },


]
  