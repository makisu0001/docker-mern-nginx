import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./Pages/App.tsx";
import Admin from "./Pages/Admin.tsx";
import Dashboard from "./Pages/Dashboard/index.tsx";
import Intro from "./Pages/Dashboard/Intro.tsx";
import WorkList from "./Pages/Dashboard/WorkList.tsx";
import Profile from "./Pages/Dashboard/Profile.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/dashboard/",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "intro",
        element: <Intro />,
      },
      {
        path: "worklist",
        element: <WorkList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
