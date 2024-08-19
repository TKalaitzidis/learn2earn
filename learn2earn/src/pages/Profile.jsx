import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ItemList from "../components/ItemList";
import Sidebar from "../components/Sidebar.jsx";
import { Link } from "react-router-dom";

function Profile({ name, isAuth }) {
  const [items, setItems] = useState([]);
  const [isOverlay, setIsOverlay] = useState(false);

  const toggleOverlay = () => {
    setIsOverlay(!isOverlay);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsOverlay(false);
    }
  };

  const handlePointsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 5) {
      setPoints(value);
    } else if (e.target.value === "") {
      setPoints("");
    }
  };

  const handleBlur = () => {
    if (points === "" || points < 1) {
      setPoints(1);
    } else if (points > 5) {
      setPoints(5);
    }
  };

  const genres = [
    "Adventure",
    "Biography",
    "Children's",
    "Classics",
    "Comics",
    "Contemporary",
    "Cookbooks",
    "Crime",
    "Drama",
    "Dystopian",
    "Fantasy",
    "Graphic Novels",
    "Historical Fiction",
    "Horror",
    "Humor",
    "Literary Fiction",
    "Memoir",
    "Mystery",
    "Non-Fiction",
    "Paranormal",
    "Philosophy",
    "Poetry",
    "Psychology",
    "Religion",
    "Romance",
    "Science",
    "Science Fiction",
    "Self-Help",
    "Short Stories",
    "Suspense",
    "Spirituality",
    "Sports",
    "Thriller",
    "Travel",
    "True Crime",
    "Young Adult",
  ];

  const [currentUser, setCurrentUser] = useState(name); // State for current user

  const [currentCategory, setCurrentCategory] = useState("All"); // State for current category
  const categories = ["All", "Sci-Fi", "Fantasy", "Adventure", "Fiction", "Dystopian"]; 

  const user = {
    name: name,
    location: "Athens",
    points: 120,
    booksOffering: 50,
    email: "chrisiscool@gmail.com",
  };

  async function userbooks() {
    try {
      const response = await fetch(
        `http://localhost:8000/books/userbooks?username=${encodeURIComponent(
          name
        )}`,
        {
          method: "GET",
        }
      );

      const parseRes = await response.json();
      const userBooks = parseRes.map((book) => ({
        author: book.book_author,
        name: book.book_name,
        genre: book.book_genre,
        points: book.book_points,
        type: book.book_type,
      }));

      setItems(userBooks);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    userbooks();
  }, [name]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar isAuth={isAuth} name={name} />
      <div className="pt-20"></div>
      <div className="container mx-auto max-w-3xl p-4 bg-white rounded-lg shadow-md flex items-center">
        <div className="flex-shrink-0">
          <img
            src="https://via.placeholder.com/50"
            alt="User Icon"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="ml-4 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <h2 className="text-lg font-medium m-2 pr-20 md:mb-0">
              {user.name}
            </h2>
            <div className="flex flex-col md:flex-row justify-between w-full md:ml-4">
              <div className="flex flex-col mb-2 md:mb-0 md:mr-4">
                <p className="text-gray-600">Location: {user.location}</p>
                <p className="text-gray-600">Points: {user.points}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600">
                  Books Offering: {user.booksOffering}
                </p>
                <p className="text-gray-600">E-mail: {user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            onClick={toggleOverlay}
          >
            Add New Book
          </button>

          <Link to="/settings">
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
              User Settings
            </button>
          </Link>
        </div>
        {isOverlay && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleOverlayClick}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-96 relative">
              <button
                className="absolute top-2 right-2 text-black text-xl"
                onClick={() => setIsOverlay(false)}
              >
                &times;
              </button>
              <form className="p-6">
                <h2 className="text-lg font-semibold mb-4">Book Submission</h2>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Genre
                </label>
                <div className="mb-4 flex flex-col border border-gray-300 p-2 rounded">
                  <select required className="outline-none">
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="points"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Points
                  </label>
                  <input
                    type="number"
                    id="points"
                    name="points"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    min="1"
                    max="5"
                    defaultValue="1"
                    onChange={handlePointsChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <ItemList username={name} isMain={false} items={items} />
        <Sidebar
          categories={categories}
          onCategoryChange={setCurrentCategory}
        />
      </div>
    </div>
  );
}

export default Profile;
