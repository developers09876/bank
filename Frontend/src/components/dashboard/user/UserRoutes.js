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
const roles = localStorage.getItem("userType");
export const UserRoutes = [
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
    path: "/user/insu",
    element: <Insurance />,
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
    path: "/user/taxDetails",
    element: <TaxDetails />,
  },
  {
    path: "/user/feedback",
    element: <Feedback />,
  },
  {
    path: "/user/rewards",
    element: <Rewards />,
  },
];
