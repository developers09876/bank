import TaxDashboard from "../TaxAdmin/TaxDashboard";
import TaxManagements from "../TaxAdmin/TaxManagements";
import TaxUserList from "../TaxAdmin/TaxUserList";
import CreateLead from "./CreateLead";
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
  ];