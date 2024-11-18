import LoanStatusTable from "./LoanStatus";
import TabsProfile from "./ProfileTabs";

export const UserRoutes = [
    { path: "", element: <TabsProfile /> },
    { path: "loanstatus", element: <LoanStatusTable /> },

   
  ];
  