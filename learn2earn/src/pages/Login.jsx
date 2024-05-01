import Navbar from "../components/Navbar";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";


function Login() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-8 bg-white shadow-md rounded-lg">
                    <form className="space-y-4">
                        <h1 className="text-xl font-bold text-center">Login</h1>
                        <div className="input-box flex items-center border border-gray-300 p-2 rounded">
                            <FaUser className="text-gray-400" />
                            <input type="text" placeholder="Username" required className="flex-1 ml-2 outline-none" />
                        </div>
                        <div className="input-box flex items-center border border-gray-300 p-2 rounded">
                            <RiLockPasswordFill className="text-gray-400" />
                            <input type="password" placeholder="Password" required className="flex-1 ml-2 outline-none" />
                        </div>
                        <div className="remember-forgot flex justify-between items-center text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="ml-2">Remember me</span>
                            </label>
                            <a href="#" className="text-black font-bold hover:text-gray-700">Forgot Password?</a>
                        </div>
                        <button type="submit" className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                        <div className="register-link text-center text-sm">
                            <p>Don't have an account? <a href="/register" className="text-black font-bold hover:text-gray-700">Register now!</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
