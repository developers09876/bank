import TaxDashboard from "../TaxAdmin/TaxDashboard";
import TaxManagements from "../TaxAdmin/TaxManagements";
import TaxUserList from "../TaxAdmin/TaxUserList";
import TabsProfile from "./ProfileTabs";
export const TaxAdminRoutes = [
    { path: "", element: <TaxDashboard /> },
    { path: "myprofile", element: <TabsProfile /> },
    { path: "taxmanagement", element: <TaxManagements /> },
    { path: "taxuserlist", element: <TaxUserList /> },

  ];