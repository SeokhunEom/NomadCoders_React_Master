import Coin from "./Coin";
import Coins from "./Coins";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Coins />,
  },
  {
    path: "/:coinId",
    element: <Coin />,
  },
]);

export default router;
