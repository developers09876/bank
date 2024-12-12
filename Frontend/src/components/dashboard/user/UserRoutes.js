import { Navigate } from "react-router-dom";
import InsuranceDetails from "./InsuranceDetails";
import LoanStatusTable from "./LoanStatus";
import TabsProfile from "./ProfileTabs";
import TaxDetails from "./TaxDetails";

const roles = localStorage.getItem("userType");
export const UserRoutes = [
  {
    path: "/user",
    element: <TabsProfile />,
  },
  {
    path: "/user/loanstatus",
    element: roles === "user" ? <LoanStatusTable /> : <Navigate to="/login" />,
  },
  {
    path: "/user/insuranceDetails",
    element: roles === "user" ? <InsuranceDetails /> : <Navigate to="/login" />,
  },
  {
    path: "/user/taxDetails",
    element: roles === "user" ? <TaxDetails /> : <Navigate to="/login" />,
  },
];
