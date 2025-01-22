import InsuranceDashboard from "../InsuranceAdmin/InsuranceDashboard";
import InsuranceManagements from "../InsuranceAdmin/InsuranceManagements";
import InsuranceUserList from "../InsuranceAdmin/InsuranceUserList";
import CreateLead from "./CreateLead";
import InsuranceLeadDetails from "./InsuranceLeadDetails";
import InsuranceLeadManagement from "./InsuranceLeadManagement";
import InsuranceEmployeeList from "./InsuranceEmployeeList";
import AddInsuranceEmployee from "./AddInsuranceEmployee";
import TabsProfile from "./ProfileTabs";
import TaskManagementDetails from "./TaskManagementDetalis";
import TaskManagements from "./TaskManagements";
import CreateInsuranceManagement from "./CreateInsuranceManagement";

export const  InsuranceAdminRoutes = [
  { path: "", element: <InsuranceDashboard /> },
  { path: "myprofile", element: <TabsProfile /> },
  { path: "insurancemanagement", element: <InsuranceManagements /> },
  { path: "insuranceuserlist",element: <InsuranceUserList/>},
  { path: "/employeeInsurance/createlead", element: <CreateLead /> },
  { path: "leadmanagement", element: <InsuranceLeadManagement /> },
  { path: "leaddetails", element: <InsuranceLeadDetails /> },
  { path: "insuranceemployeelist", element: <InsuranceEmployeeList/> },
  { path: "/employeeInsurance/taskManagementdetails/:id", element: <TaskManagementDetails /> },
  { path: "taskManagement", element: <TaskManagements /> },
  { path: "createinauranceMangement", element: <CreateInsuranceManagement /> },
  { path: "/employeeInsurance/addinsuranceemployee", element: <AddInsuranceEmployee/> },
];
