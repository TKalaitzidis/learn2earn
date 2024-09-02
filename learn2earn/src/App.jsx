import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./pages/Main.jsx";
import Login from "./pages/Login.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Register from "./pages/Register.jsx";
import ForgPass from "./pages/ForgPass.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import UserChoice from "./pages/UserChoice.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const categories = [
    "All",
    "Sci-Fi",
    "Fantasy",
    "Adventure",
    "Fiction",
    "Dystopian",
    "Mystery",
    "Thriller",
    "Horror",
    "Romance",
    "Historical Fiction",
    "Biography",
    "Self-Help",
    "Non-Fiction",
    "Young Adult",
    "Children's",
    "Graphic Novel",
    "Poetry",
    "Crime",
    "Memoir",
    "Philosophy",
    "Science",
    "Technology",
    "Travel",
    "Classics",
    "Humor",
  ];
  
  const cities = [
    "Athens",
    "Thessaloniki",
    "Patras",
    "Heraklion",
    "Larissa",
    "Volos",
    "Rhodes",
    "Ioannina",
    "Chania",
    "Chalcis",
  ];

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  async function checkIsAuth() {
    try {
      const response = await fetch("http://localhost:8000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token, username: user.name },
      });

      const parseRes = await response.json();

      parseRes.verify === true ? setIsAuth(true) : setIsAuth(false);
      parseRes.isAdmin === true ? setIsAdmin(true) : setIsAdmin(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getName() {
    try {
      const response = await fetch("http://localhost:8000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setUser({
        name: parseRes.user_name,
        email: parseRes.user_email,
        id: parseRes.user_id,
        area: parseRes.user_area,
        upoints: parseRes.user_points,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getName();
    checkIsAuth();
  });

  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route
          path="/home"
          element={
           !isAdmin ? (
              <Main
                isAuth={isAuth}
                name={user.name}
                categories={categories}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuth ? (
              <Login
                setIsAuth={setIsAuth}
                isAuth={isAuth}
                setIsAdmin={setIsAdmin}
              />
            ) : (
              <Navigate to="/profile" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuth ? (
              <Register setIsAuth={setIsAuth} isAuth={isAuth} cities={cities} />
            ) : (
              <Navigate to="/profile" />
            )
          }
        />

        <Route
          path="/contact"
          element={<Contact isAuth={isAuth} name={user.name} />}
        />
        <Route
          path="/about"
          element={<About isAuth={isAuth} name={user.name} />}
        />
        <Route path="/forgpass" element={<ForgPass />} />

        <Route
          path="/settings"
          element={
            isAuth ? (
              <Settings
                setIsAuth={setIsAuth}
                isAuth={isAuth}
                name={user.name}
                checkIsAuth={checkIsAuth}
              />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/userchoice"
          element={
            <UserChoice
              isAuth={isAuth}
              name={user.name}
              area={user.area}
              email={user.email}
              u_id={user.id}
            />
          }
        />
        <Route
          path="/profile"
          element={
            isAuth ? (
              isAdmin ? (
                <Dashboard
                  name={user.name}
                  isAuth={isAuth}
                  categories={categories}
                  cities={cities}
                />
              ) : (
                <Profile
                  isAdmin={isAdmin}
                  isAuth={isAuth}
                  name={user.name}
                  area={user.area}
                  email={user.email}
                  upoints={user.upoints}
                  categories={categories}
                  u_id={user.id}
                />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
