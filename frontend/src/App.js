import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./pages/home/Home";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import UserModify from "./pages/usermodify/UserModify";
import MyPage from "./pages/mypage/MyPage";
import Pieces from "./pages/pieces/Pieces";
import Help from "./pages/help/Help";

import GlobalStyle from "./GlobalStyle";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Main />,
    element: <LogIn />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/usermodify",
    element: <UserModify />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/pieces",
    element: <Pieces />,
  },
  {
    path: "/help",
    element: <Help />,
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
