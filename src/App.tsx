import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homepage";
import Session from "./pages/session";
import Room from "./pages/room";
import "./App.css";
import Ticket from "./pages/ticket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/session",
    element: <Session />,
  },
  {
    path: "/session/room",
    element: <Room />,
  },
  {
    path: "/session/room/ticket",
    element: <Ticket />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
