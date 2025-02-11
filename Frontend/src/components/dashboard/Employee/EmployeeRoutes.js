import { Navigate } from "react-router-dom";
import InsuranceReview from "./InsuranceReview";
import TaxReview from "./TaxReview";
import EmployeeDashboard from "./Dashboard";
import LeadGeneration from "./LeadGeneration";
import TabsProfile from "./ProfileTabs";
import Dashboard from "./Dashboard";
import LeadManagement from "./LeadManagement";
import LeadDetails from "./LeadDetails";
import CreateLead from "./CreateLead";
import TaskManagement from "./TaskManagement";
import LoanManagements from "./LoanManagement";
import LoanDetails from "./LoanDetails";
import Insurance from "./InsuranceManagement";
import CreateInsuranceManagement from "./CreateInsuranceManagement";
import InsuranceDetails from "./InsuranceDetails";
import Tax from "./TaxManagement";
import CreateTaxmangement from "./CreateTaxManagement";
import TaxDetails from "./TaxDetails";
import LoanFormProfileTab from "./LoanForm/LoanFormProfileTab";
import LoanTaskManagement from "./LoanTaskManagement";
import InsuranceTaskManagement from "./InsuranceTaskManagement";
import TaxTaskManagement from "./TaxTaskManagement";
import LeadTaskManagement from "./LeadTaskManagement";
import LeadTaskViewDetails from "./LeadTaskViewDetails";
import LoanTaskViewDetails from "./LoanTaskViewDetails";
import ClientStatisticsPage from "./ClientStatsChart/ClientStatisticsPage";
import ClientStatisticsTable from "./ClientStatsChart/ClientStatisticsTable";
import InsTaskViewDetails from "./InsTaskViewDetails";
import TaxTaskViewDetails from "./TaxTaskViewDetails";
import InsuranceManagementEdit from "./InsuranceManagementEdit";
import TaxsManagementEdit from "./TaxManagementEdit";
import LoanProfileTab from "./LoanManagementForm/LoanProfileTabs";
import UserLoanFormProfileTab from "../../landing/LoanForm/LoanFormProfileTab";
import TaxsTaskManagementEdit from "./TaxTaskManagementEdit";
import TaxManagementEdit from "./TaxManagementEdit";
import InsuranceEditDetails from "./InsuranceEditDetails";

export const EmployeeRoutes = [
  {
    path: "/employee",
    element: <Dashboard />,
  },
  {
    path: "/employee/myprofile",
    element: <TabsProfile />,
  },
  {
    path: "/employee/leadmanagement",
    element: <LeadManagement />,
  },
  {
    path: "/employee/leaddetails/:id",
    element: <LeadDetails />,
  },
  {
    path: "/employee/createlead",
    element: <CreateLead />,
  },
  {
    path: "/employee/taskmanagement",
    element: <TaskManagement />,
  },
  {
    path: "/employee/loanmanagement",
    element: <LoanManagements />,
  },
  {
    path: "/employee/loandetails/:id",
    element: <LoanDetails />,
  },
  {
    path: "/employee/insurancemanagement",
    element: <Insurance />,
  },
  {
    path: "/employee/insuranceEditdetails/:id",
    element: <InsuranceEditDetails />,
  },
  {
    path: "/employee/createinsurance",
    element: <CreateInsuranceManagement />,
  },
  {
    path: "/employee/insurancedetails/:id",
    element: <InsuranceDetails />,
  },
  {
    path: "/employee/taxmanagement",
    element: <Tax />,
  },
  {
    path: "/employee/createtax",
    element: <CreateTaxmangement />,
  },
  {
    path: "/employee/taxdetails/:id",
    element: <TaxDetails />,
  },
  {
    path: "/employee/editloan/:id",
    element: <LoanFormProfileTab />,
  },
  {
    path: "/employee/loantaskmanagement",
    element: <LoanTaskManagement />,
  },
  {
    path: "/employee/insurancetaskmanagement",
    element: <InsuranceTaskManagement />,
  },
  {
    path: "/employee/taxtaskmanagement",
    element: <TaxTaskManagement />,
  },
  {
    path: "/employee/editInsuranceManagement/:id",
    element: <InsuranceManagementEdit />,
  },
  {
    path: "/employee/editTaxTaskManagement/:id",
    element: <TaxsTaskManagementEdit />,
  },
  {
    path: "/employee/editTax/:id",
    element: <TaxManagementEdit />,
  },
  {
    path: "/employee/leadtaskmanagement",
    element: <LeadTaskManagement />,
  },
  {
    path: "/employee/leadtaskdetails/:id",
    element: <LeadTaskViewDetails />,
  },
  {
    path: "/employee/loantaskdetails/:id",
    element: <LoanTaskViewDetails />,
  },
  {
    path: "/employee/Insurancetaskdetails/:id",
    element: <InsTaskViewDetails />,
  },
  {
    path: "/employee/Taxtaskdetails/:id",
    element: <TaxTaskViewDetails />,
  },
  {
    path: "/employee/client-statistics/:status",
    element: <ClientStatisticsPage />,
  },
  {
    path: "/employee/client-statistics/:status/:category",
    element: <ClientStatisticsTable />,
  },
  {
    path: "/employee/editownloan/:id",
    element: <LoanProfileTab />,
  },
  {
    path: "/employee/createloan",
    element: <UserLoanFormProfileTab />,
  },
];
