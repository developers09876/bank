import AddAdmin from "./AddAdmin";
import ContactUs from "./ContactUs";
import CreateJobForm from "./createJobform";
import CreateLead from "./CreateLead";
import AdminDashboard from "./dashboard";
import EmployeeList from "./EmployeeList";
import InsuranceManagement from "./InsuranceManagement";
import JobRequest from "./JobRequest";
import LeadDetails from "./LeadDetails";
import LeadGeneration from "./LeadGeneration";
import Loancards from "./Loancards";
import LoanDashboard from "./LoanDashboard";
import LoanDetails from "./LoanDetails";
import LoanManagement from "./LoanManagement";
import LoanStatus from "./LoanStatus";
import TaxManagement from "./TaxManagement";
import UserList from "./UserList";
import CreatTaxManagement from "./CreateTaxManagementAdmin/CreateTaxManagement";
import TaxManagementDetails from "./CreateTaxManagementAdmin/TaxManagementDetails";
import CreateInsuranceManagement from "./CreateInsuranceManagement";
import InsuranceManagementDetails from "./InsuranceManagementDetalis";
import Subscription from "./Subscription";

export const AdminRoutes = [
  { path: "", name: "", element: <AdminDashboard /> },
  { path: "userlist", element: <UserList /> },
  { path: "employeelist", element: <EmployeeList /> },
  { path: "/admin/addAdmin", element: <AddAdmin /> },
  { path: "createjobform", element: <CreateJobForm /> },
  { path: "jobrequest", element: <JobRequest /> },
  { path: "loanManagement", element: <LoanManagement /> },
  { path: "insuranceManagement", element: <InsuranceManagement /> },
  { path: "taxManagement", element: <TaxManagement /> },
  { path: "loancards", element: <Loancards /> },
  { path: "loanstatus", element: <LoanStatus /> },
  { path: "loandashboard", element: <LoanDashboard /> },
  { path: "leadgeneration", element: <LeadGeneration /> },
  { path: "createlead", element: <CreateLead /> },
  { path: "subscription", element: <Subscription /> },

  { path: "createTaxMangement", element: <CreatTaxManagement /> },
  { path: "createinauranceMangement", element: <CreateInsuranceManagement /> },
  { path: "contact", element: <ContactUs /> },
  { path: "leaddetails/:id", element: <LeadDetails /> },
  { path: "taxManagementdetails/:id", element: <TaxManagementDetails /> },
  { path: "insuranceManagementdetails/:id", element: <InsuranceManagementDetails /> },


  { path: "loandetails/:id", element: <LoanDetails /> },

  // { path: "insurance", element: <InsuranceReview /> },
];
