import Navbar from "../components/Navbar";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail, MdTry } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";

function Register({setIsAuth, isAuth, cities}) {
  
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    city: 'Athens'
  })

  const registerUser = async (e) => {
    e.preventDefault()

    try {
      
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      
      const parseRes = await response.json()
      
      if(parseRes.token){
        localStorage.setItem("token", parseRes.token);
        toast.success("User successfully registered!");
        setIsAuth(true)
      }
      else if (parseRes.userExists){
        toast.error("User already exists.");
        setIsAuth(false)
      }
      else if (parseRes.invalidEmail){
        toast.error("Invalid Email.");
        setIsAuth(false)
      }
      
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white shadow-md rounded-lg">
          <form className="space-y-4" onSubmit={registerUser}>
            <h1 className="text-xl font-bold text-center">Register</h1>
            <div className="input-box flex items-center border border-gray-300 p-2 rounded">
              <MdEmail className="text-gray-400" />
              <input
                type="text"
                placeholder="E-mail"
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                required
                className="flex-1 ml-2 outline-none"
              />
            </div>
            <div className="input-box flex items-center border border-gray-300 p-2 rounded">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                value={data.username}
                onChange={(e) => setData({...data, username: e.target.value})}
                required
                className="flex-1 ml-2 outline-none"
              />
            </div>
            <div className="input-box flex items-center border border-gray-300 p-2 rounded">
              <RiLockPasswordFill className="text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                required
                className="flex-1 ml-2 outline-none"
              />
            </div>
            <div className="flex flex-col border border-gray-300 p-2 rounded">
              <select
              value={data.city}
              onChange={(e) => setData({...data, city: e.target.value})}
               required className="outline-none">
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-sm text-gray-400 mt-2">
              Please choose the location closest to where you live
            </span>
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <div className="register-link text-center text-sm">
              <p>
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-black font-bold hover:text-gray-700"
                >
                  Login!
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
