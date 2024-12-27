import StockMarketDashboard from "../StockMarket/StockMarketDashboard";
import StockMarketManagements from "../StockMarket/StockMarketManagements";

export const   StockMarketRoutes = [
  { path: "", element: < StockMarketDashboard /> },
  { path: "stockMarketManagements", element: < StockMarketManagements /> },
];
