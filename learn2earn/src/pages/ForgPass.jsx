import Navbar from "../components/Navbar";
import { MdEmail } from "react-icons/md";

function ForgPass() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-8 bg-white shadow-md rounded-lg">
                    <form className="space-y-4">
                        <h1 className="text-xl font-bold text-center">Forgot Password</h1>
                        <span className="text-sm text-gray-500 mt-2">
                            Just enter your e-mail address and we will send you your password as soon as possible.
                        </span>    
                        <div className="input-box flex items-center border border-gray-300 p-2 rounded">
                            <MdEmail className="text-gray-400" />
                            <input type="text" placeholder="E-mail" required className="flex-1 ml-2 outline-none" />
                        </div>
                    
                        <button type="submit" className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                        <div className="register-link text-center text-sm">
                            <p>Don't have an account? <a href="/register" className="text-black font-bold hover:text-gray-700">Register now!</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgPass;
