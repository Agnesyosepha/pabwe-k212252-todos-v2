import { useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthLogin } from "./states/authLogin/action";
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import TodoAddPage from "./pages/TodoAddPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import Cover from "./pages/Cover"; // Import Cover component

function App() {
  const { authLogin = null, isPreload = false } = useSelector(
    (states) => states
  );
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onAuthSignOut = () => {
    dispatch(asyncUnsetAuthLogin());
  };

  if (isPreload) {
    return null;
  }

  // When user is not logged in, show login/register routes
  if (authLogin === null) {
    const activeRegister = location.pathname === "/register" ? "active" : "";
    const activeLogin = location.pathname !== "/register" ? "active" : "";
    return (
      <div>
        <header className="fixed-top">
          <Loading />
        </header>
        <div className="w-300px mx-auto mt-5">
          <div className="card shadow-sm">
            <div className="text-center py-2">
              <h2>Forum App</h2>
            </div>
            <ul className="nav nav-pills mb-3">
              <li className="nav-item w-50 text-center">
                <Link className={`nav-link ${activeLogin} btl`} to="/">
                  Login
                </Link>
              </li>
              <li className="nav-item w-50 text-center">
                <Link
                  className={`nav-link ${activeRegister} btl`}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </ul>
            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  // When user is logged in, show the app with cover page
  return (
    <>
      <div>
        <header className="fixed-top">
          <Navigation authLogin={authLogin} onAuthSignOut={onAuthSignOut} />
          <Loading />
        </header>
        <main className="margin-main">
          <Routes>
            {/* Display Cover Page first after login */}
            <Route path="/" element={<Cover />} />
            {/* Define the rest of your app's routes */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/users/me" element={<ProfilePage />} />
            <Route path="/todos/:id" element={<TodoDetailPage />} />
            <Route path="/todos/add" element={<TodoAddPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
