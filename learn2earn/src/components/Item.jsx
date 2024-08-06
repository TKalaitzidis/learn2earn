import React, { useState } from "react";

function Item(props) {
  const [isClicked, setIsClicked] = useState(false);

  const toggleOverlay = () => {
    setIsClicked(!isClicked);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsClicked(false);
    }
  };

  const users = Array.from({ length: 1000 }, (_, i) => ({
    name: `Name ${i + 1}`,
    area: "Athens",
  }));

  return (
    <>
      <tr
        className="bg-white border border-gray-400 rounded-lg hover:shadow-lg transition-shadow duration-300 relative"
        onClick={toggleOverlay}
      >
        <td className="text-sm font-semibold px-5 py-3 border-b-2 border-gray-200">
          {props.author}
        </td>
        <td className="text-md font-bold px-5 py-3 border-b-2 border-gray-200">
          {props.title}
        </td>
        <td className="text-xs px-5 py-3 border-b-2 border-gray-200">
          {props.category}
        </td>
        <td className="text-xs px-5 py-3 border-b-2 border-gray-200">
          {props.points}
        </td>
        <td className="text-xs px-5 py-3 border-b-2 border-gray-200">
          {props.type}
        </td>
      </tr>
      {isClicked && props.isMain && (
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
              <h2 className="text-xl font-semibold text-gray-800">{props.title}</h2>
              <p className="text-gray-600">{props.author}</p>
              <p className="text-gray-600">
                Cost: {props.points} {props.points > 1 ? "points" : "point"}
              </p>
              <p className="text-gray-600">{props.type}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-2">
                This book is offered by the following users:
              </p>
              <div className="overflow-y-auto max-h-64 border border-gray-200 rounded-lg p-2">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-gray-600 p-2 border-b border-gray-200 last:border-0"
                  >
                    <p>{user.name} ({user.area})</p>
                    <button className="ml-4 bg-gray-900 hover:bg-black text-white font-bold py-1 px-2 rounded">
                      Choose
                    </button>
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
