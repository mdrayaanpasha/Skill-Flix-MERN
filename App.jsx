import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "../register";
import Login from "./login";
import Home from "./home";
import Programming from "./programming";
import Notifications from "./notifications";
import Connections from "./connections";
import Chatroom from "./chatroom";
import Trading from "./trading";
import Language from "./language";
import Cooking from "./cooking";

function App() {
  const router = createBrowserRouter([
    {
      path: "/reg",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/programming",
      element: <Programming />
    },
    {
      path: "/notifications",
      element: <Notifications />
    },
    {
      path:"/connections",
      element: <Connections/>
    },
    {
      path: "/chatroom",
      element: <Chatroom/>
    },
    {
      path:"/trading",
      element: <Trading/>
    },
    {
      path: "/language",
      element: <Language/>
    },
    {
      path:"/cooking",
      element:<Cooking/>
    }
  ]);

  return (
    <RouterProvider router={router}>
      {/* Your application components */}
    </RouterProvider>
  );
}

export default App;
