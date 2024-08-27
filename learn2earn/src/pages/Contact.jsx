import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";

function Contact({ isAuth, name }) {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = {
      description: description,
      username: anonymous ? "anonymous" : name,
    };
    try {
      const response = await fetch(
        `http://localhost:8000/dashboard/contactsubmit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info),
        }
      );

      if (response.ok) {
        console.log(response);
        navigate(`/home`);
      } else {
        console.error("Failed to submit the report.");
      }
      navigate(`/home`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuth={isAuth} name={name} />
      <div className="container mx-auto px-4 pt-28 pb-8">
        <h2 className="text-xl font-bold text-center my-4">
          Found a bug? Please report it to us!
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow"
        >
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              placeholder="Describe the issue in as much detail as possible"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="anonymous"
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              Stay Anonymous
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
