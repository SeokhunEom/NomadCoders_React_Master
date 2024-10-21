import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./Routes/Home";
import Layout from "./Components/Layout";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "movies/:movieId",
          element: <Home />,
        },
        {
          path: "tv",
          element: <Tv />,
        },
        {
          path: "search",
          element: <Search />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
