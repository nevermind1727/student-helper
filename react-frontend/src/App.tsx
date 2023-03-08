import { useEffect } from "react";
import {
  BrowserRouter,
  useNavigate,
  Routes as ReactRoutes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./routes/Routes";
import { useGetUserMutation } from "./apis/usersApi";
import { useGetAuthMutation } from "./apis/authApi";
import { useAppDispatch } from "./app/hooks";
import { setAuthUser } from "./features/auth/authSlice";

function getCookie(name: string) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

function App() {
  const [getUser] = useGetUserMutation();
  const [getAuth] = useGetAuthMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = getCookie("user");
  if (user) {
    dispatch(setAuthUser({ user: JSON.parse(user) }));
    console.log(user);
  }
  return <Routes />;
}

export default App;
