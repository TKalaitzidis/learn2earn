import React, { useState, useEffect, useMemo, useRef  } from "react";
import Navbar from "../components/Navbar";
import ItemList from "../components/ItemList";
import Sidebar from "../components/Sidebar.jsx";
import { Link } from "react-router-dom";


function Profile({ name, isAuth, area, email, upoints, categories, u_id }) {
  const isInitialMount = useRef(true);
  
  const [items, setItems] = useState([]);
  const [isOverlay, setIsOverlay] = useState(false);
  const [allBooks, setAllBooks] = useState([]); 
  const [input, setInput] = useState({
    book_name: '',
    book_author: '',
    book_genre: 'Sci-fi',
    book_type: 'Physical',
    user_id: ''
  })
  const [user, setUser] = useState({
    name: name,
    email: email,
    area: area,
    points: upoints
  })


  const storedOwner = JSON.parse(localStorage.getItem('owner'));
  const isStoredOwnerNameNull = storedOwner ? storedOwner.user_name === null : true;
  

  const memoizedUser = useMemo(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;

        if (storedOwner && !isStoredOwnerNameNull) {
            localStorage.removeItem('owner');
            console.log("run store")
            return {
                name: storedOwner.user_name,
                email: storedOwner.user_email,
                area: storedOwner.user_area,
                points: storedOwner.user_points,
            };
        } else {
            console.log("run norm")
            return {
              
                name: name,
                email: email,
                area: area,
                points: upoints,
            };
        }
    } else {
      console.log("run norm2")
        return {
            name: name,
            email: email,
            area: area,
            points: upoints,
        };
    }
}, [storedOwner, isStoredOwnerNameNull, name, email, area, upoints]);


  // Update user state based on memoized value
  useMemo(() => {
    setUser(memoizedUser);
  }, []);


  const inpCategories = categories.filter(item => item !=="All");  

  const toggleOverlay = () => {
    setIsOverlay(!isOverlay);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsOverlay(false);
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
      if(!isDiffUser){
        setInput({...input, user_id: u_id});
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const submit = async (e) =>{
    e.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:8000/books/submit`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(input)
        }
      );

      await response.text();
      
      userbooks();
      setIsOverlay(false);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  useEffect(() => {
    userbooks();
  });
  
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
                <p className="text-gray-600">Points: {user.points}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600">
                  Books Offering: {items.length}
                </p>
                <p className="text-gray-600">E-mail: {user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {!isDiffUser && (<div><div className="flex justify-center space-x-4 mb-8">
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
                <form
                onSubmit={submit}
                className="p-6">
                  
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
                      value={input.book_name}
                      onChange={(e) => setInput({...input, book_name: e.target.value})}
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
                      onChange={(e) => setInput({...input, book_author: e.target.value})}
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
                    onChange={(e) => setInput({...input, book_genre: e.target.value})}
                    required className="outline-none">
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
                    onChange={(e) => setInput({...input, book_type: e.target.value})}
                    required className="outline-none">
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
          )}</div>)}  
          
        <ItemList username={user.name} isMain={false} items={items} />
        <Sidebar
          categories={categories}
          onCategoryChange={handleCategoryChange}
          onTypeChange={handleTypeChange}
          currentCategory={currentCategory}
          currentType={currentType}
        />
      </div>
    </div>
  );
}

export default Profile;
