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

function App() {
  const [getUser] = useGetUserMutation();
  const [getAuth] = useGetAuthMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const user = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("user="))
      .split("=")[1];
    if (user) {
      dispatch(setAuthUser({ user: JSON.parse(user) }));
      console.log(user);
    }
  }, []);
  return <Routes />;
}

export default App;
