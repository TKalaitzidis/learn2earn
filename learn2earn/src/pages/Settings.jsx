import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";

function Settings({ setIsAuth, isAuth, name }) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmOverlay, setConfirmOverlay] = useState(false);
  const [action, setAction] = useState("");

  //New password states
  const [newPass, setNewPass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");

  //New Username
  const [newName, setNewName] = useState("");

  //New Email
  const [newMail, setNewMail] = useState("");

  const showConfirmation = (action) => {
    setConfirmOverlay(true);
    setAction(action);
  };

  async function deleteUser() {
    try {
      const response = await fetch(
        "http://localhost:8000/dashboard/deleteuser",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_name: name,
            
          }),
        }
      );

      const parseRes = await response.text();

      console.log(parseRes);

      localStorage.removeItem("token");
      setIsAuth(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function changeUsername(){
    try {
        const response = await fetch(
          "http://localhost:8000/dashboard/changename",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_name: name,
              new_name: newName
            }),
          }
        );
  
        const parseRes = await response.text();
  
        console.log(parseRes);

      } catch (error) {
        console.error(error.message);
      }
  }

  async function changeEmail(){
    try {
        const response = await fetch(
          "http://localhost:8000/dashboard/changemail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_name: name,
              new_mail: newMail
            }),
          }
        );
  
        const parseRes = await response.text();
  
        console.log(parseRes);

      } catch (error) {
        console.error(error.message);
      }
  }


  async function changePass(){
    try {
        const response = await fetch(
          "http://localhost:8000/dashboard/changepass",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_name: name,
              new_pass: newPass
            }),
          }
        );
  
        const parseRes = await response.text();
  
        console.log(parseRes);

      } catch (error) {
        console.error(error.message);
      }
  }


  const handleConfirmPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          password: confirmPassword,
        }),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        if (action == "delete") {
          deleteUser();
        }
        else if (action == "username") {
            changeUsername();
        }
        else if (action == "email"){
            changeEmail();
        }
        else if (action == "password"){
            changePass();
        }
      } else {
        console.log(false);
      }
    } catch (error) {
      console.error(error.message);
    }

    setConfirmOverlay(false);
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuth={isAuth} name={name} />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-xl font-bold mb-4 text-center">Settings</h1>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showConfirmation("username");
              }}
            >
              <button
                type="submit"
                className="mt-6 w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Change Username
              </button>
            </form>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showConfirmation("password");
              }}
            >
              <button
                type="submit"
                className="mt-6 w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Change Password
              </button>
            
            </form>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showConfirmation("email");
              }}
            >
              <button
                type="submit"
                className="mt-6 w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Change Email
              </button>
            
            </form>
          </div>

          <button
            onClick={(e) => logout(e)}
            className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Log Out
          </button>
          <div className="mt-4">
            <button
              onClick={() => showConfirmation("delete")}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Delete Account
            </button>
            <p className="text-gray-600 italic mt-2">
              Warning: This action is permanent.
            </p>
          </div>
        </div>

        {confirmOverlay && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <form onSubmit={handleConfirmPassword}>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm your Current password
                </label>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full mb-4"
                />
                {action == "password" && (
                  <div>
                    <label
                      htmlFor="newpass"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Set a new Password
                    </label>
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md w-full mb-4"
                    />
                    <label
                      htmlFor="confnewpass"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm your new Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confNewPass}
                      onChange={(e) => setConfNewPass(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md w-full mb-4"
                    />
                  </div>
                )}
                {action == "username" && (
                  <div>
                    <label
                      htmlFor="newname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Set a new Username
                    </label>
                    <input
                      type="text"
                      placeholder="New Username"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md w-full mb-4"
                    />
                  </div>
                )}
                {action == "email" && (
                  <div>
                    <label
                      htmlFor="newname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Set a new Email
                    </label>
                    <input
                      type="text"
                      placeholder="New Email"
                      value={newMail}
                      onChange={(e) => setNewMail(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md w-full mb-4"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmOverlay(false)}
                  className="w-full mt-2 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
