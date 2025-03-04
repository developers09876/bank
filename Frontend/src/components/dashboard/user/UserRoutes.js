import { Navigate } from "react-router-dom";
import InsuranceDetails from "./InsuranceDetails";
import LoanStatusTable from "./LoanStatus";
import TabsProfile from "./ProfileTabs";
import TaxDetails from "./TaxDetails";
import Feedback from "./Feedback";
import Taxmangement from "./TaxMangement/Taxmangement";
import LoanDetails from "./LoanDetails";
import Rewards from "./Rewards";
import Insurance from "../../landing/InsuranceForm/Insurance";
import Tax from "../../landing/TaxFormTab/Tax";
import LeadGeneration from "./LeadGeneration";
import CreateLead from "./CreateLead";
import LoanForm from "../user/LoanForm/LoanFormProfileTab";
import InsuranceViewDetails from "../../landing/InsuranceForm/InsuranceViewDetails";
import TaxViewDetails from "../../landing/TaxFormTab/TaxViewDetails";
import TaxEditDetails from "../../landing/TaxFormTab/TaxEditDetails";
import InsuranceEditDetails from "../../landing/InsuranceForm/InsuranceEditDetails";
import UserDashboard  from "./UserDashboard";
import ClientStatisticsPage from "./ClientStatisticsPage";
import ClientStatisticsTable from "./ClientStatisticsTable";
const roles = localStorage.getItem("userType");
export const UserRoutes = [
  {
    path: "/user/userdashboard",
    element: <UserDashboard />,
  },
  {
    path: "/user",
    element: <TabsProfile />,
  },
  {
    path: "/user/userTaxmangemnent",
    element: <Taxmangement />,
  },
  {
    path: "/user/loanstatus",
    element: <LoanStatusTable />,
  },
  {
    path: "/user/userloandetails/:id",
    element: <LoanDetails />,
  },
  {
    path: "/user/loanform/:id",
    element: <LoanForm />,
  },
  {
    path: "/user/insu",
    element: <Insurance />,
  },
  {
    path: "/user/InsuranceViewdetails/:id",
    element: <InsuranceViewDetails />,
  },
  {
    path: "/user/insuranceEditdetails/:id",
    element: <InsuranceEditDetails />,
  },
  {
    path: "/user/insuranceDetails",
    element: <InsuranceDetails />,
  },

  {
    path: "/user/tax",
    element: <Tax />,
  },
  {
    path: "/user/TaxViewdetails/:id",
    element: <TaxViewDetails />,
  },
  {
    path: "/user/TaxEditdetails/:id",
    element: <TaxEditDetails />,
  },
  {
    path: "/user/taxDetails",
    element: <TaxDetails />,
  },
  {
    path: "/user/leadgeneration",
    element: <LeadGeneration />,
  },
  {
    path: "/user/createlead",
    element: <CreateLead />,
  },
  {
    path: "/user/feedback",
    element: <Feedback />,
  },
  {
    path: "/user/rewards",
    element: <Rewards />,
  },
  {
    path: "/user/client-statistics/:status",
    element: <ClientStatisticsPage />,
  },
  {
    path: "/user/client-statistics/:status/:category",
    element: <ClientStatisticsTable />,
  },
];
