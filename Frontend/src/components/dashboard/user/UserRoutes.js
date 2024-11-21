import { Navigate } from "react-router-dom";
import InsuranceDetails from "./InsuranceDetails";
import LoanStatusTable from "./LoanStatus";
import TabsProfile from "./ProfileTabs";
import TaxDetails from "./TaxDetails";

const role = localStorage.getItem("userType")


export const UserRoutes = [
    { path: "", element: role === "user" ? <TabsProfile /> : <Navigate to="/login" /> },
    { path: "/user/loanstatus", element: role === "user" ? <LoanStatusTable /> : <Navigate to="/login" />},
    { path: "/user/insuranceDetails", element: role === "user" ? <InsuranceDetails /> : <Navigate to="/login" />},
    { path: "/user/taxDetails", element: role === "user" ? <TaxDetails /> : <Navigate to="/login" /> },
   
  ];
  