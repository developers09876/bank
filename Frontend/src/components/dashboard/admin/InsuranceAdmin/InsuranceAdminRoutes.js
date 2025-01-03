import InsuranceDashboard from "../InsuranceAdmin/InsuranceDashboard";
import InsuranceManagements from "../InsuranceAdmin/InsuranceManagements";
import InsuranceUserList from "../InsuranceAdmin/InsuranceUserList";
import TabsProfile from "./ProfileTabs";

export const  InsuranceAdminRoutes = [
  { path: "", element: <InsuranceDashboard /> },
  { path: "myprofile", element: <TabsProfile /> },
  { path: "insurancemanagement", element: <InsuranceManagements /> },
  {path: "insuranceuserlist",element: <InsuranceUserList/>}
];
