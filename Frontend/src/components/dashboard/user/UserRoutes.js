import InsuranceDetails from "./InsuranceDetails";
import LoanStatusTable from "./LoanStatus";
import TabsProfile from "./ProfileTabs";
import TaxDetails from "./TaxDetails";


export const UserRoutes = [
    { path: "", element: <TabsProfile /> },
    { path: "/user/loanstatus", element: <LoanStatusTable /> },
    { path: "/user/insuranceDetails", element: <InsuranceDetails /> },
    { path: "/user/taxDetails", element: <TaxDetails /> },
   
  ];
  