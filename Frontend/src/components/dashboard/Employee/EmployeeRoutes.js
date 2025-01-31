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
    path: "/employee/leaddetails",
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
    path: "/employee/editloan",
    element: <LoanFormProfileTab />,
  },
];
