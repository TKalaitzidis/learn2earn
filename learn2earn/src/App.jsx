import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Login from './pages/Login.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Register from './pages/Register.jsx';
import ForgPass from './pages/ForgPass.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Chatroom from './pages/Chatroom.jsx';
import Settings from './pages/Settings.jsx';
import UserChoice from './pages/UserChoice.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgpass" element={<ForgPass />} />
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/chatroom' element={<Chatroom />}/>
        <Route path='/settings' element={<Settings />}/>
        <Route path='/userchoice' element={<UserChoice />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
