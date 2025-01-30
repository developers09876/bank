import InsuranceEmployeeDashboard from "./InsuranceEmployeeDashboard";
import ProfileTabs from "./ProfileTabs";
import InsuranceManagement from "./InsuranceManagement";
import InsuranceLeadManagement from "./InsuranceLeadManagement";
import InsuranceLeadDetails from "./Insurance Lead Details";
import CreateLead from "./CreateLead";
import InsuranceDetails from "./Insurance Details";
import InsuranceTaskManagement from "./InsuranceTaskManagement";
import CreateInsuranceManagement from "./CreateInsuranceManagement";
import InsuranceViewDetails from "./InsuranceViewDetails";
const roles = localStorage.getItem("userType");

export const InsuranceEmployeeRoutes = [
  { path: "/insuranceEmply", element: <InsuranceEmployeeDashboard /> },
  { path: "myprofile", element: <ProfileTabs /> },
  { path: "insurancemanagement", element: <InsuranceManagement /> },
  { path: "createinsurancemanagement", element: <CreateInsuranceManagement /> },
  { path: "insuranceleadmanagement", element: <InsuranceLeadManagement /> },
  { path: "leaddetails", element: <InsuranceLeadDetails /> },
  { path: "/insuranceEmply/createlead", element: <CreateLead /> },
  {
    path: "/insuranceEmply/insurancedetails/:id",
    element: <InsuranceDetails />,
  },
  {
    path: "/insuranceEmply/InsuranceViewdetails/:id",
    element: <InsuranceViewDetails />,
  },
  { path: "insurancetaskmanagement", element: <InsuranceTaskManagement /> },
];
