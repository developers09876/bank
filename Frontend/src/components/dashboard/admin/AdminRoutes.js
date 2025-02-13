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
import ClientStatisticsPage from "./ClientStatsChart/ClientStatisticsPage";
import ClientStatisticsTable from "./ClientStatsChart/ClientStatisticsTable";
import UserDetailsPage from "./UserDetailsPage";
import EmployeeDetailsPage from "./EmployeeDetailsPage";
import TaxManagementEdit from "./CreateTaxManagementAdmin/TaxManagementEdit";
import InsuranceEditDetails from "./InsuranceEditDetails";
import CreateNewLoanForm from "./CreateNewLoanForm/CreateLoanProfileTab";

export const AdminRoutes = [
  { path: "", name: "", element: <AdminDashboard /> },
  {
    path: "/admin/client-statistics/:status",
    element: <ClientStatisticsPage />,
  },
  {
    path: "/admin/client-statistics/:status/:category",
    element: <ClientStatisticsTable />,
  },
  { path: "userlist", element: <UserList /> },
  { path: "userdetails/:id", element: <UserDetailsPage /> },
  { path: "employeedetails/:id", element: <EmployeeDetailsPage /> },
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
  {
    path: "insuranceManagementdetails/:id",
    element: <InsuranceManagementDetails />,
  },
  {
    path: "editTaxManagement/:id",
    element: <TaxManagementEdit />,
  },
  {
    path: "insuranceEditdetails/:id",
    element: <InsuranceEditDetails />,
  },

  { path: "loandetails/:id", element: <LoanDetails /> },

  {
    path: "/admin/createloan",
    element: <CreateNewLoanForm />,
  },

  // { path: "insurance", element: <InsuranceReview /> },
];
