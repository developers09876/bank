import InsuranceDashboard from "../InsuranceAdmin/InsuranceDashboard";
import InsuranceManagements from "../InsuranceAdmin/InsuranceManagements";
import InsuranceUserList from "../InsuranceAdmin/InsuranceUserList";

export const  InsuranceAdminRoutes = [
  { path: "", element: <InsuranceDashboard /> },
  { path: "insurancemanagement", element: <InsuranceManagements /> },
  {path: "insuranceuserlist",element: <InsuranceUserList/>}
];
