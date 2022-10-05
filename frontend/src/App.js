import * as React from "react";
import { useDispatch } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { getUser } from "./redux/authSlice";

import GlobalStyle from "./GlobalStyle";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import MyPage from "./pages/mypage/MyPage";
import UserModify from "./pages/usermodify/UserModify";
import Pieces from "./pages/pieces/Pieces";
import Piece from "./pages/piece/Piece";
// import Register from "./pages/register/Register";
import Filter from "./pages/filter/Filter";
import PieceCommit from "./pages/piececommit/PieceCommit";
import StyleTransfer from "./pages/style-transfer/StyleTransfer";
import Scent from "./pages/scent/Scent";
import NotFound from "./pages/not-found/NotFound";
import Searchpieces from "./pages/pieces/Searchpieces";

const isLogin = () => !!localStorage.getItem("access-token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: isLogin() ? <Navigate to="/" replace /> : <Login />,
  },
  {
    path: "/signup",
    element: isLogin() ? <Navigate to="/" replace /> : <Signup />,
  },
  {
    path: "/usermodify",
    element: isLogin() ? <UserModify /> : <Navigate to="/" replace />,
  },
  {
    path: "/mypage/:targetUserSeq",
    element: <MyPage />,
  },
  {
    path: "/pieces",
    element: <Pieces />,
  },
  {
    path: "/pieces/search/:searchName",
    element: <Searchpieces />,
  },
  {
    path: "/pieces/:pieceSeq",
    element: <Piece />,
  },
  {
    path: "/filter",
    element: <Filter />,
  },
  {
    path: "/register",
    // element: isLogin() ? <PieceCommit /> : <Navigate to="/" replace />,
    element: isLogin() ? <Register /> : <Navigate to="/" replace />,
  },
  {
    path: "/style",
    element: <StyleTransfer />,
  },
  {
    path: "/scent",
    element: <Scent />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  AOS.init();

  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </React.Fragment>
  );
};

export default App;
