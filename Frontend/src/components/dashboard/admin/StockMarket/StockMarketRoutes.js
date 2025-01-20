import StockMarketDashboard from "../StockMarket/StockMarketDashboard";
import StockMarketManagements from "../StockMarket/StockMarketManagements";
import StockMarketUserlist from "../StockMarket/StockMarketUserlist";
import CreateLead from "./CreateLead";
import StockLeadDetails from "./StockLeadDetails";
import StockLeadManagement from "./StockLeadManagement";

export const   StockMarketRoutes = [
  { path: "", element: < StockMarketDashboard /> },
  { path: "stockMarketManagements", element: < StockMarketManagements /> },
  { path: "/employeeStockMarket/createlead", element: <CreateLead /> },
  {path: "stockuserlist", element: < StockMarketUserlist/>},
  { path: "leadmanagement", element: <StockLeadManagement /> },
  { path: "leaddetails", element: <StockLeadDetails /> },
];



