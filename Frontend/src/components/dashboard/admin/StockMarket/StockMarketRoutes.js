import StockMarketDashboard from "../StockMarket/StockMarketDashboard";
import StockMarketManagements from "../StockMarket/StockMarketManagements";
import StockMarketUserlist from "../StockMarket/StockMarketUserlist";

export const   StockMarketRoutes = [
  { path: "", element: < StockMarketDashboard /> },
  { path: "stockMarketManagements", element: < StockMarketManagements /> },
  {path: "stockuserlist", element: < StockMarketUserlist/>},
];
