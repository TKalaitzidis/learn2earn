import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Item({ item, willOverlay, logged_name, type }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  async function whoOwns() {
    try {
      const response = await fetch(
        `http://localhost:8000/books/whoowns?book_name=${encodeURIComponent(
          item.name
        )}`,
        {
          method: "GET",
        }
      );

      const parseRes = await response.json();

      const userList = parseRes.map((user) => ({
        user_name: user.user_name,
        user_email: user.user_email,
        user_area: user.user_area,
        user_points: user.user_points,
        user_id: user.user_id,
      }));

      setItems(userList);
    } catch (error) {
      console.error(error.message);
    }
  }
  const handleProfile = (owner) => {
    navigate(`/profile`, {
      state: {
        user_name: owner.user_name,
        user_email: owner.user_email,
        user_area: owner.user_area,
        user_points: owner.user_points,
        user_id: owner.user_id,
      },
    });
  };

  const handleUserChoice = (owner, book) => {
    navigate(`/userchoice`, {
      state: {
        user_name: owner.user_name,
        user_email: owner.user_email,
        user_area: owner.user_area,
        user_points: owner.user_points,
        book: book,
        user_id: owner.user_id,
      },
    });
  };

  const [isClicked, setIsClicked] = useState(false);

  const toggleOverlay = () => {
    setIsClicked(!isClicked);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    if (isClicked) {
      whoOwns();
    }
  }, [isClicked]);

  return (
    <>
      {type == "books" && (
        <tr
          className="bg-white border border-gray-400 rounded-lg hover:shadow-lg transition-shadow duration-300 relative"
          onClick={toggleOverlay}
        >
          <td className="text-sm font-semibold px-5 py-3 border-b-2 border-gray-200">
            {item.author}
          </td>
          <td className="text-md font-bold px-5 py-3 border-b-2 border-gray-200">
            {item.name}
          </td>
          <td className="text-xs px-5 py-3 border-b-2 border-gray-200">
            {item.genre}
          </td>
          <td className="text-xs px-5 py-3 border-b-2 border-gray-200">
            {item.points}
          </td>
          <td className="text-xs px-5 py-3 border-b-2 border-gray-200">
            {item.type}
          </td>
        </tr>
      )}

      {type == "users" && (
        <tr
          className="bg-white border border-gray-400 rounded-lg hover:shadow-lg transition-shadow duration-300 relative"
          onClick={toggleOverlay}
        >
          <td className="text-sm font-semibold px-5 py-3 border-b-2 border-gray-200">
            {item.user_id}
          </td>
          <td className="text-md font-bold px-5 py-3 border-b-2 border-gray-200">
            {item.user_name}
          </td>
          <td className="text-xs px-5 py-3 border-b-2 border-gray-200">
            {item.user_email}
          </td>
          <td className="text-xs px-5 py-3 border-b-2 border-gray-200">
            {item.user_area}
          </td>
          <td className="text-xs px-5 py-3 border-b-2 border-gray-200">
            {item.user_points}
          </td>
          <td className="text-xs px-5 py-3 border-b-2 border-gray-200">
            {item.bandays}
          </td>
        </tr>
      )}

      {isClicked && willOverlay && type == "books" && (
        <div
          className="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
            <button
              onClick={toggleOverlay}
              className="absolute top-2 right-2 text-black text-2xl font-bold"
            >
              &times;
            </button>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-600">{item.author}</p>
              <p className="text-gray-600">
                Cost: {item.points} {item.points > 1 ? "points" : "point"}
              </p>
              <p className="text-gray-600">{item.type}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-2">
                This book is offered by the following users:
              </p>
              <div className="overflow-y-auto max-h-64 border border-gray-200 rounded-lg p-2">
                {items.map((owner, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-gray-600 p-2 border-b border-gray-200 last:border-0"
                  >
                    <a
                      href="/profile"
                      onClick={(e) => {
                        toggleOverlay(e);
                        e.preventDefault();
                        handleProfile(owner);
                      }}
                    >
                      {owner.user_name} ({owner.user_area})
                    </a>
                    {logged_name != owner.user_name && (
                      <button
                        className="ml-4 bg-gray-900 hover:bg-black text-white font-bold py-1 px-2 rounded"
                        onClick={(e) => {
                          toggleOverlay(e);
                          e.preventDefault();
                          handleUserChoice(owner, item);
                        }}
                      >
                        Choose
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Item;
