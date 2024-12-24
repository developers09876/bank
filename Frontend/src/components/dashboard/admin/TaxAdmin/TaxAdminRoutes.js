import TaxDashboard from "../TaxAdmin/TaxDashboard";
import TaxManagements from "../TaxAdmin/TaxManagements";
import TaxUserList from "../TaxAdmin/TaxUserList";
export const TaxAdminRoutes = [
    { path: "", element: <TaxDashboard /> },
    { path: "taxmanagement", element: <TaxManagements /> },
    { path: "taxuserlist", element: <TaxUserList /> },

  ];