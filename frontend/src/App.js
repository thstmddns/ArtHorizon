import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtectedRoute>
        <Signup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/usermodify",
    element: (
      <PrivateRoute>
        <UserModify />
      </PrivateRoute>
    ),
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
    path: "/pieces/:pieceSeq",
    element: <Piece />,
  },
  {
    path: "/filter",
    element: <Filter />,
  },
  {
    path: "/register",
    element: (
      <PrivateRoute>
        <Register />
      </PrivateRoute>
    ),
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

// import React, { useEffect, useState } from "react";
// import { Routes, Route, useLocation, useParams } from "react-router-dom";
// import { RecommendPlaceMain, PlaceDetailMain } from "./pages/index";
// import Navbar from "../src/components/common/Navbar";
// import Footer from "./components/common/Footer";
// import OnBoard from "./pages/OnBoard";
// import MyPage from "./pages/MyPage";
// import Survey from "./pages/Survey";
// import Redirect from "./components/oauth/Redirect";
// import SNS from "./pages/SNS";
// import { Provider, useSelector } from "react-redux";
// import store, { RootState } from "./store";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import "./App.css";
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import { AuthState } from "../src/store/auth";
// import { springAxios } from "./apis";
// function App() {
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated
//   );

//   if (isAuthenticated) {
//     springAxios.defaults.headers.common["Authorization"] =
//       localStorage.getItem("accessToken")!;
//   }
//   const location = useLocation();
//   const userId = useSelector((state: RootState) => state.auth.userId);

//   const isSurveyed = window.location.href.includes("survey");

//   // const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // survey 시 navbar 제거 위함

//   // useEffect(() => {}, [isAuthenticated]);

//   // const isSurveyed = useSelector((state: RootState) => state.auth.isSurveyed);

//   return (
//     <>
//       {isAuthenticated && !isSurveyed && (
//         <Navbar isAuthenticated={isAuthenticated} userId={userId} />
//       )}
//       {/* 로그인 기능 구현 될 경우 Navbar 수정 /}
//       {/ <Navbar isAuthenticated={isAuthenticated} /> /}
//       <TransitionGroup className="transition-group">
//         <CSSTransition
//           key={location.pathname}
//           classNames="pageSlider"
//           timeout={500}
//         >
//           <Routes location={location}>
//             <Route path="/" element={<OnBoard />} />
//             <Route
//               path="/survey"
//               element={
//                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                   <Survey />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/mypage/:id"
//               element={
//                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                   <MyPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/recommendMain"
//               element={
//                 <RecommendPlaceMain
//                   latitude={36.271610662143146}
//                   longitude={129.29439396586432}
//                 />
//               }
//             />
//             {/ <Route path="/kakao" element={<Redirect />} /> /}
//             <Route path="/place/:place_id" element={<PlaceDetailMain />} />
//             <Route path="/sns" element={<SNS />} />
//           </Routes>
//         </CSSTransition>
//       </TransitionGroup>
//       {/ <Footer /> */}
//       {isAuthenticated && <Footer />}
//     </>
//   );
// }

// export default App;
