import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Help from './Router/Help';
import Login from './Router/Login';

import Main from './Router/Main';
import Pieces from './Router/Pieces';
import Signup from './Router/Signup';
import Mypage from './Router/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/pieces',
    element: <Pieces />
  },
  {
    path: '/help',
    element: <Help />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/mypage',
    element: <Mypage />
  },
  {
    path: '/pieces/:id'
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
