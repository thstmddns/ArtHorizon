import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Search from "./pages/search/Search";
import Piece from "./pages/piece/Piece";
import Register from "./pages/register/Register";
import Filter from "./pages/filter/Filter";
import StyleTransfer from "./pages/style-transfer/StyleTransfer";
import Scent from "./pages/scent/Scent";
import NotFound from "./pages/not-found/NotFound";
import Searchpieces from "./pages/pieces/Searchpieces";

// localStorage에 access-token이 있으면 로그인 상태라고 판단
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
    path: "/search",
    element: <Search />,
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
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  AOS.init();

  React.useEffect(() => {
    // localStorage에 access-token (JWT) 있으면 getUser()로 로그인 사용자 정보 가져옴
    if (localStorage.getItem("access-token")) {
      dispatch(getUser());
    }
    // console.log("isLoggedIn:", isLoggedIn);
    // console.log("access-token:", localStorage.getItem("access-token"));
    // isLoggedIn 넣는 이유는 로그아웃하는 것을 감지하기 위해
  }, [dispatch, isLoggedIn]);

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
