import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Main from "./pages/home/Home";
import TestHome from "./pages/testhome/TestHome";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import MyPage from "./pages/mypage/MyPage";
import UserModify from "./pages/usermodify/UserModify";
import Pieces from "./pages/pieces/Pieces";
import Help from "./pages/help/Help";
import Filter from "./pages/filter/Filter";
import PieceDetail from "./pages/piecedetail/PieceDetail";

import GlobalStyle from "./GlobalStyle";
import PieceCommit from "./pages/piececommit/PieceCommit";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Main />,
    element: <TestHome />,
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
    // path: "/mypage",
    path: "/mypage/:targetUserSeq",
    element: <MyPage />,
  },
  {
    path: "/pieces",
    element: <Pieces />,
  },
  {
    path: "/piece/:pieceSeq",
    element: <PieceDetail />,
  },
  {
    path: "/filter",
    element: <Filter />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/register",
    element: <PieceCommit />,
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
