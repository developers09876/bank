import TaxDashboard from "../TaxAdmin/TaxDashboard";
import TaxManagements from "../TaxAdmin/TaxManagements";
export const TaxAdminRoutes = [
    { path: "", element: <TaxDashboard /> },
    { path: "taxmanagement", element: <TaxManagements /> },
  ];