import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ToC from "../components/ToC.jsx";
import { useLocation } from "react-router-dom";

function UserChoice({ isAuth, name, area, email, u_id }) {
  const location = useLocation();
  const queryParams = location.state;

  const [isClicked, setIsClicked] = useState(false);

  const toggleOverlay = () => {
    setIsClicked(!isClicked);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsClicked(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuth={isAuth} name={name} />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-xl font-bold mb-4 text-center">
          Confirm Book Choice
        </h1>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 italic mb-3">
            Please add your Home address so we can notify the user to send you
            the book.
          </h2>
          <form>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                id="firstname"
                placeholder="First Name"
                className="mt-1 p-2 border border-gray-300 rounded-md w-1/2"
              />
              <input
                type="text"
                id="lastname"
                placeholder="Last Name"
                className="mt-1 p-2 border border-gray-300 rounded-md w-1/2"
              />
            </div>
            <div className="mt-4 w-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div>
                <input
                  type="text"
                  id="streetname"
                  placeholder="Street Name"
                  className="mt-1 mr-3 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  id="number"
                  placeholder="Number"
                  className="mt-1 mr-3 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  id="floor"
                  placeholder="Floor, Unit etc."
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex space-x-3 mt-3">
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-1/2"
                />
                <input
                  type="text"
                  id="postal"
                  placeholder="Postal Code"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-1/2"
                />
              </div>
              <div className="flex space-x-3 mt-3">
                <input
                  type="text"
                  id="country"
                  placeholder="Country"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-1/2"
                />
                <input
                  type="text"
                  id="state"
                  placeholder="State"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-1/2"
                />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-700">
                I have read and agree with the{" "}
                <span
                  className="text-black-900 font-semibold italic underline cursor-pointer"
                  onClick={toggleOverlay}
                >
                  Terms and Conditions
                </span>
                {isClicked && (
                  <div
                    onClick={handleOverlayClick}
                    className="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                  >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
                      <button
                        onClick={toggleOverlay}
                        className="absolute top-2 right-2 m-20 text-black text-2xl font-bold hover:border hover:bg-black hover:text-white hover:rounded"
                      >
                        &times;
                      </button>
                      <ToC />
                    </div>
                  </div>
                )}
                .
              </label>
            </div>
            <div className="flex mt-5 justify-center">
                    <button
                      type="submit"
                      className="bg-black text-white px-10 py-2 rounded-md hover:bg-gray-800"
                    >
                      Submit
                    </button>
                  </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserChoice;
