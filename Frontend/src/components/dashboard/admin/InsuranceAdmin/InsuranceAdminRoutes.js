import InsuranceDashboard from "../InsuranceAdmin/InsuranceDashboard";
import InsuranceManagements from "../InsuranceAdmin/InsuranceManagements";
import InsuranceUserList from "../InsuranceAdmin/InsuranceUserList";
import CreateLead from "./CreateLead";
import InsuranceLeadDetails from "./InsuranceLeadDetails";
import InsuranceLeadManagement from "./InsuranceLeadManagement";
import TabsProfile from "./ProfileTabs";

export const  InsuranceAdminRoutes = [
  { path: "", element: <InsuranceDashboard /> },
  { path: "myprofile", element: <TabsProfile /> },
  { path: "insurancemanagement", element: <InsuranceManagements /> },
  {path: "insuranceuserlist",element: <InsuranceUserList/>},
  { path: "/employeeInsurance/createlead", element: <CreateLead /> },
  { path: "leadmanagement", element: <InsuranceLeadManagement /> },
  { path: "leaddetails", element: <InsuranceLeadDetails /> },
];
