import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import axios, { AxiosHeaders } from "axios";
import { ThemeContext } from "utils/context";

import Register from "pages/Auth/Register";
import Login from "pages/Auth/Login";
import Comment from "pages/Comment/Comment";
import Home from "pages/Home";
import Profile from "pages/Profile/Profile";
import Editprofile from "pages/Editprofile";

axios.defaults.baseURL = "https://onallo.store/";

function App() {
  const [cookie, , removeCookie] = useCookies(["token"]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  const checkToken = cookie.token;

  axios.interceptors.request.use(
    function (response) {
      return response;
    },
    function (error) {
      const { data } = error.response;
      if (data === "Missing" || [401, 403].includes(data.code)) {
        removeCookie("token");
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: checkToken ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: checkToken ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/profile",
      element: checkToken ? <Profile /> : <Navigate to="/login" />,
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
    {
      path: "/comment",
      element: checkToken ? <Comment /> : <Navigate to="/" />,
    },
    {
      path: "/editprofile",
      element: checkToken ? <Editprofile/> : <Navigate to="/profile"/>
    }
  ]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

export default App;
