import { Navigate } from "react-router-dom";
import InsuranceDetails from "./InsuranceDetails";
import LoanStatusTable from "./LoanStatus";
import TabsProfile from "./ProfileTabs";
import TaxDetails from "./TaxDetails";
import Feedback from "./Feedback";
import Taxmangement from "./TaxMangement/Taxmangement";

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
    path: "/user/insuranceDetails",
    element: <InsuranceDetails />,
  },
  {
    path: "/user/taxDetails",
    element: <TaxDetails />,
  },
  {
    path: "/user/feedback",
    element: <Feedback />,
  },
];
