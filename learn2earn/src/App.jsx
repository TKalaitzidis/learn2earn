import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
    "Humor"
  ];
  
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState([]);
  

  async function checkIsAuth() {
    try {
      const response = await fetch("http://localhost:8000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuth(true) : setIsAuth(false);
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
        name : parseRes.user_name,
        email : parseRes.user_email,
        id : parseRes.user_id,
        area : parseRes.user_area,
        upoints : parseRes.user_points
      });
      
    } catch (error) {
      console.error(error.message);
    }
  }

  
  useEffect(() => {
    getName();
  });

  useEffect(() => {
    checkIsAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Main isAuth={isAuth} name={user.name} categories={categories}/>} />
        <Route
          path="/login"
          element={
            !isAuth ? (
              <Login setIsAuth={setIsAuth} isAuth={isAuth} />
            ) : (
              <Navigate to="/profile" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuth ? (
              <Register setIsAuth={setIsAuth} isAuth={isAuth} />
            ) : (
              <Navigate to="/profile" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuth ? (
              <Dashboard name={user.name} isAuth={isAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route path="/contact" element={<Contact isAuth={isAuth} name={user.name}/>} />
        <Route path="/about" element={<About isAuth={isAuth} name={user.name}/>} />
        <Route path="/forgpass" element={<ForgPass />} />

        <Route
          path="/settings"
          element={
            isAuth ? (
              <Settings setIsAuth={setIsAuth} isAuth={isAuth} name={user.name} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route path="/userchoice" element={<UserChoice />} />
        <Route path="/profile" element={<Profile isAuth={isAuth} name={user.name} area={user.area} email={user.email} upoints={user.upoints} categories={categories} u_id={user.id} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
