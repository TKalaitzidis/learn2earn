import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ItemList from "../components/ItemList";
import Sidebar from "../components/Sidebar.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Profile({
  name,
  isAuth,
  isAdmin,
  area,
  email,
  categories,
  u_id,
  phpoints,
  pdfpoints,
}) {
  const location = useLocation();
  const queryParams = location.state;

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [isOverlay, setIsOverlay] = useState(false);
  const [isHistOverlay, setIsHistOverlay] = useState(false);
  const [isReqOverlay, setIsReqOverlay] = useState(false);

  const [allBooks, setAllBooks] = useState([]);
  const [input, setInput] = useState({
    book_name: "",
    book_author: "",
    book_genre: "Sci-fi",
    book_type: "Physical",
    user_id: u_id,
  });

  const [history, setHistory] = useState([]);
  const [requests, setRequests] = useState([]);

  const [user, setUser] = useState({
    name: queryParams?.user_name || name,
    email: queryParams?.user_email || email,
    area: queryParams?.user_area || area,
    pdfpoints: queryParams?.user_pdf_points || pdfpoints,
    phpoints: queryParams?.user_ph_points || phpoints,
  });

  const inpCategories = categories.filter((item) => item !== "All");

  const toggleOverlay = () => {
    setIsOverlay(!isOverlay);
  };

  const toggleHistOverlay = () => {
    console.log(isHistOverlay);
    setIsHistOverlay(!isHistOverlay);
  };

  const toggleReqOverlay = () => {
    setIsReqOverlay(!isReqOverlay);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsOverlay(false);
    }
  };

  const handleHistOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsHistOverlay(false);
    }
  };

  const handleReqOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsReqOverlay(false);
    }
  };

  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentType, setCurrentType] = useState("All Types");

  const handleCategoryChange = (selectedCategory) => {
    setCurrentCategory(selectedCategory);
    if (selectedCategory === "All") {
      setItems(allBooks);
    } else {
      const filteredBooks = allBooks.filter(
        (book) => book.genre === selectedCategory
      );
      setItems(filteredBooks);
    }
  };

  const handleTypeChange = (selectedType) => {
    setCurrentType(selectedType);
    if (selectedType === "All Types") {
      setItems(allBooks);
    } else {
      const filteredBooks = allBooks.filter(
        (book) => book.type === selectedType
      );
      setItems(filteredBooks);
    }
  };

  const isDiffUser = false;

  async function userbooks() {
    try {
      const response = await fetch(
        `http://localhost:8000/books/userbooks?username=${encodeURIComponent(
          user.name
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
      setAllBooks(userBooks);
      if (!isDiffUser) {
        setInput({ ...input, user_id: u_id });
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function userhistory() {
    try {
      const response = await fetch(
        `http://localhost:8000/books/history?username=${encodeURIComponent(
          user.name
        )}`,
        {
          method: "GET",
        }
      );

      const parseRes = await response.json();
      const resHist = parseRes.map((book) => ({
        author: book.book_author,
        name: book.book_name,
        genre: book.book_genre,
        points: book.book_points,
        type: book.book_type,
      }));

      const userHist = resHist.filter(
        (book) =>
          !allBooks.some(
            (histBook) => JSON.stringify(book) === JSON.stringify(histBook)
          )
      );

      setHistory(userHist);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getRequests() {
    try {
      const response = await fetch(
        `http://localhost:8000/books/getrequests?offerer_id=${encodeURIComponent(
          u_id
        )}`,
        {
          method: "GET",
        }
      );

      const parseRes = await response.json();
      const resReqs = parseRes.map((request) => ({
        book_id: request.b_id,
        requester_id: request.requester_id,
        offerer_id: request.offerer_id,
        request_id: request.request_id,
        user_name: request.user_name,
        book_name: request.book_name,
      }));

      setRequests(resReqs);
    } catch (error) {
      console.error(error.message);
    }
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/books/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const parseRes = await response.text();

      if (parseRes == "New book submitted successfully.") {
        toast.success(parseRes);
        setInput({
          book_name: "",
          book_author: "",
          book_genre: "Sci-fi",
          book_type: "Physical",
          user_id: u_id,
        });
      } else {
        toast.error(parseRes);
      }

      userbooks();
      navigate(0);
      setIsOverlay(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    userbooks();
    userhistory();
    getRequests();
    setUser({
      name: queryParams?.user_name || name,
      email: queryParams?.user_email || email,
      area: queryParams?.user_area || area,
      pdfpoints: queryParams?.user_pdf_points || pdfpoints,
      phpoints: queryParams?.user_ph_points || phpoints,
    });
  }, [location]);


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
                <p className="text-gray-600">Location: {user.area}</p>
                <p className="text-gray-600">
                  Points: {user.phpoints} Ph. & {user.pdfpoints} PDF
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600">Books Offering: {items.length}</p>
                <p className="text-gray-600">E-mail: {user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {user.name == name ? (
          <div>
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

              <button
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                onClick={() => {
                  if (history) {
                    toggleHistOverlay();
                  } else {
                    toast.error(
                      `All books ${user.name} ever owned are currently active.`
                    );
                  }
                }}
              >
                User History
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                onClick={() => {
                  if (requests.length>0) {
                    toggleReqOverlay();
                  } else {
                    toast.error(`You do not have any requests right now.`);
                  }
                }}
              >
                Manage Requests
              </button>
            </div>
            {isOverlay && (
              <div
                className="fixed overlay inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={handleOverlayClick}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden w-96 relative">
                  <button
                    className="absolute top-2 right-2 text-black text-xl"
                    onClick={() => setIsOverlay(false)}
                  >
                    &times;
                  </button>
                  <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Book Submission
                    </h2>
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
                        value={input.book_name}
                        onChange={(e) =>
                          setInput({ ...input, book_name: e.target.value })
                        }
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
                        value={input.book_author}
                        onChange={(e) =>
                          setInput({ ...input, book_author: e.target.value })
                        }
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
                      <select
                        value={input.book_genre}
                        onChange={(e) =>
                          setInput({ ...input, book_genre: e.target.value })
                        }
                        required
                        className="outline-none"
                      >
                        {inpCategories.map((genre) => (
                          <option key={genre} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Type
                    </label>
                    <div className="mb-4 flex flex-col border border-gray-300 p-2 rounded">
                      <select
                        value={input.book_type}
                        onChange={(e) =>
                          setInput({ ...input, book_type: e.target.value })
                        }
                        required
                        className="outline-none"
                      >
                        <option key="Physical" value="Physical">
                          Physical
                        </option>
                        <option key="PDF" value="PDF">
                          PDF
                        </option>
                      </select>
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

            {isReqOverlay && (
              <div
                className="fixed inset-0 overlay bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={handleReqOverlayClick}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden w-auto relative">
                  <button
                    className="absolute top-2 right-2 text-black text-xl"
                    onClick={() => setIsReqOverlay(false)}
                  >
                    &times;
                  </button>
                  <h1 className="mx-72 my-10 font-semibold">Requests</h1>
                  <ItemList
                    username={user.name}
                    willOverlay={false}
                    items={requests}
                    logged_id={u_id}
                    type={"requests"}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-8">
              <button
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                onClick={() => {
                  if (!history) {
                    toggleHistOverlay();
                  } else {
                    toast.error(
                      `All books ${user.name} ever owned are currently active.`
                    );
                  }
                }}
              >
                User History
              </button>
            </div>
          </div>
        )}
        {isHistOverlay && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleHistOverlayClick}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-auto relative">
              <button
                className="absolute top-2 right-2 text-black text-xl"
                onClick={() => setIsHistOverlay(false)}
              >
                &times;
              </button>
              <h1 className="mx-72 my-10 font-semibold">
                Books Previously owned by {user.name}:
              </h1>
              <ItemList
                username={user.name}
                willOverlay={false}
                items={history}
                logged_id={u_id}
                type={"history"}
              />
            </div>
          </div>
        )}
        <h1 className="ml-64 p-5 text-xl text-center font-semibold">
          Books offered by user {user.name}
        </h1>

        <ItemList
          username={user.name}
          willOverlay={queryParams ? true : false}
          items={items}
          logged_name={name}
          logged_id={u_id}
          type={"books"}
        />
        <Sidebar
          categories={categories}
          onCategoryChange={handleCategoryChange}
          onTypeChange={handleTypeChange}
          currentCategory={currentCategory}
          currentType={currentType}
          type={"books"}
        />
      </div>
    </div>
  );
}

export default Profile;
