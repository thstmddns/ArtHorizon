import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./Router/Main";
import Login from "./Router/Login";
import Signup from "./Router/Signup";
import Mypage from "./Router/MyPage";
import Pieces from "./Router/Pieces";
import PieceDetail from "./Router/PieceDetail";
import Help from "./Router/Help";

import GlobalStyle from "./GlobalStyle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/mypage",
    element: <Mypage />,
  },
  {
    path: "/pieces",
    element: <Pieces />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/pieces/:id",
    element: <PieceDetail />,
  },
]);

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
