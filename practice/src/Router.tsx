import About from "./screens/About";
import ErrorComponent from "./components/ErrorComponent";
import Followers from "./screens/users/Followers";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Root from "./Root";
import User from "./screens/users/User";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users/:userId",
        element: <User />,
        children: [
          {
            path: "followers",
            element: <Followers />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
