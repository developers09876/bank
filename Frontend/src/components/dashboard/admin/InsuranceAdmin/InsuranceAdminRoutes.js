import InsuranceDashboard from "../InsuranceAdmin/InsuranceDashboard";
import InsuranceManagements from "../InsuranceAdmin/InsuranceManagements";

export const  InsuranceAdminRoutes = [
  { path: "", element: <InsuranceDashboard /> },
  { path: "insurancemanagement", element: <InsuranceManagements /> },
];
