import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Item({
  item,
  willOverlay,
  logged_name,
  type,
  isAdmin,
  categories,
  getBooks,
  getUsers,
  cities,
  logged_id,
}) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [editedBook, setEditedBook] = useState({
    name: item.name,
    author: item.author,
    points: item.points,
    genre: item.genre,
    type: item.type,
    oldName: item.name,
  });

  const [editedUser, setEditedUser] = useState({
    user_name: item.user_name,
    user_email: item.user_email,
    user_area: item.user_area,
    user_ph_points: item.user_ph_points,
    user_pdf_points: item.user_pdf_points,
    oldName: item.user_name,
    user_bandays: item.bandays,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isUserEditing, setIsUserEditing] = useState(false);

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

  async function removeOwner(user_id, name) {
    try {
      const response = await fetch(`http://localhost:8000/books/removeowner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user_id,
          book_name: name,
        }),
      });

      const parseRes = await response.text();

      if (parseRes == "Entry Deleted Successfully.") {
        toast.success(parseRes);
        whoOwns();
      } else {
        toast.error(parseRes);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function editBook() {
    try {
      const response = await fetch(`http://localhost:8000/books/editbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedBook),
      });

      const parseRes = await response.text();

      if (parseRes == "Book Editted Successfully.") {
        toast.success(parseRes);
        setEditedBook({
          name: item.name,
          author: item.author,
          points: item.points,
          genre: item.genre,
          type: item.type,
          oldName: item.name,
        });
      } else {
        toast.error(parseRes);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function deleteUser() {
    try {
      const response = await fetch(
        "http://localhost:8000/dashboard/deleteuser",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_name: item.user_name,
          }),
        }
      );

      const parseRes = await response.text();

      if (parseRes == "Deleted successfully.") {
        toast.success(parseRes);
      } else {
        toast.error(parseRes);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function editUser() {
    try {
      const response = await fetch(`http://localhost:8000/dashboard/edituser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: editedUser.user_name,
          user_email: editedUser.user_email,
          user_area: editedUser.user_area,
          user_ph_points: editedUser.user_ph_points,
          user_pdf_points: editedUser.user_pdf_points,
          oldName: item.user_name,
          user_bandays: editedUser.user_bandays,
        }),
      });

      const parseRes = await response.text();

      if (parseRes == "Updated User Info Successfully.") {
        toast.success(parseRes);
        setEditedUser({
          user_name: editedUser.user_name,
          user_email: editedUser.user_email,
          user_area: editedUser.user_area,
          user_points: editedUser.user_points,
          oldName: editedUser.user_name,
          user_bandays: editedUser.bandays,
        });
      } else {
        toast.error(parseRes);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleProfile = (owner) => {
    navigate(`/profile`, {
      state: {
        user_name: owner.user_name,
        user_email: owner.user_email,
        user_area: owner.user_area,
        user_points: owner.user_points,
        user_pdf_points: owner.user_pdf_points,
        user_ph_points: owner.user_ph_points,
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
        user_pdf_points: owner.user_pdf_points,
        user_ph_points: owner.user_ph_points,
        book: book,
        user_id: owner.user_id,
      },
    });
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleEditUserClick = () => {
    setIsUserEditing(true);
  };

  const handleDeleteUser = () => {
    deleteUser();
    getUsers();
    setIsClicked(false);
    navigate(0);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedBook({
      name: item.name,
      author: item.author,
      points: item.points,
      genre: item.genre,
      type: item.type,
      oldName: item.name,
    });
  };

  const handleUserCancel = () => {
    setIsUserEditing(false);
    setEditedBook({
      user_name: item.user_name,
      user_email: item.user_email,
      user_area: item.user_area,
      user_points: item.user_points,
      oldName: item.user_name,
      user_bandays: item.bandays,
    });
  };

  const handleRemove = (owner, item) => {
    removeOwner(owner.user_id, item.name);
  };

  const handleRemoveProf = (logged_id, item) => {
    removeOwner(logged_id, item.name);
    navigate(0);
  };

  const handleInputChange = (e) => {
    setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
  };

  const handleUserInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const [isClicked, setIsClicked] = useState(false);

  const toggleOverlay = () => {
    setIsClicked(!isClicked);
    setIsEditing(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsClicked(false);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isClicked) {
      whoOwns();
    }
  }, [isClicked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editBook();
    getBooks();
    setIsEditing(false);
    setIsClicked(false);
    navigate(0);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    editUser();
    getUsers();
    setIsEditing(false);
    setIsClicked(false);
    navigate(0);
  };

  return (
    <>
      {type == "books" && (
        <tr
          className="bg-white border group border-gray-400 rounded-lg hover:shadow-lg transition-shadow duration-300 relative"
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
          {!willOverlay && (
            <button
              onClick={() => handleRemoveProf(logged_id, item)}
              className="absolute opacity-0 top-2 right-2 text-gray-500 text-2xl font-bold group-hover:opacity-100 transition-opacity duration-300"
            >
              &times;
            </button>
          )}
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
            {item.user_ph_points} Ph. & {item.user_pdf_points} PDF
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
      {isClicked && willOverlay && type === "books" && isAdmin && (
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

            {!isEditing ? (
              <>
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
                        {logged_name !== owner.user_name && (
                          <button
                            className="ml-4 bg-gray-900 hover:bg-black text-white font-bold py-1 px-2 rounded"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemove(owner, item);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="mt-4 bg-gray-900 hover:bg-black text-white font-bold py-2 px-2 rounded"
                  onClick={handleEditButtonClick}
                >
                  Edit Book Entry
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h4>Book Name</h4>
                  <input
                    type="text"
                    name="name"
                    value={editedBook.name}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <h4>Book Author</h4>
                  <input
                    type="text"
                    name="author"
                    value={editedBook.author}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <h4>Book Points</h4>
                  <input
                    type="number"
                    name="points"
                    min="0"
                    value={editedBook.points}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <h4>Book Genre</h4>
                  <select
                    name="genre"
                    value={editedBook.genre}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                  >
                    {categories
                      .filter((category) => category !== "All")
                      .map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                  <h4>Book Type</h4>
                  <select
                    name="type"
                    value={editedBook.type}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                  >
                    <option value="Physical">Physical</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-gray-900 hover:bg-black text-white font-bold py-2 px-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="mt-4 ml-2 bg-gray-900 hover:bg-black text-white font-bold py-2 px-2 rounded"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {isClicked && willOverlay && type == "users" && (
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
              {!isUserEditing ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.user_name}
                  </h2>
                  <p className="text-gray-600">{item.user_email}</p>
                  <p className="text-gray-600">
                    {item.user_area}, {item.user_ph_points} Ph. &{" "}
                    {item.user_pdf_points} PDF
                  </p>
                  {item.bandays > 0 && (
                    <p className="text-gray-600">
                      Banned for: {item.bandays} days
                    </p>
                  )}
                  <button
                    className="mt-4 bg-gray-900 hover:bg-black text-white font-bold py-2 px-2 rounded"
                    onClick={handleEditUserClick}
                  >
                    Edit User Info
                  </button>
                  <button
                    className="ml-4 mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded"
                    onClick={handleDeleteUser}
                  >
                    Delete User
                  </button>
                </>
              ) : (
                <form onSubmit={handleUserSubmit}>
                  <div className="mb-6">
                    <h4>User Name</h4>
                    <input
                      type="text"
                      name="user_name"
                      value={editedUser.user_name}
                      onChange={handleUserInputChange}
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <h4>User E-Mail</h4>
                    <input
                      type="text"
                      name="user_email"
                      value={editedUser.user_email}
                      onChange={handleUserInputChange}
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <h4>User Physical Points</h4>
                    <input
                      type="number"
                      name="user_ph_points"
                      value={editedUser.user_ph_points}
                      onChange={handleUserInputChange}
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <h4>User PDF Points</h4>
                    <input
                      type="number"
                      name="user_pdf_points"
                      value={editedUser.user_pdf_points}
                      onChange={handleUserInputChange}
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <h4>User Area</h4>
                    <select
                      name="user_area"
                      value={editedUser.user_area}
                      onChange={handleUserInputChange}
                      className="w-full p-2 mb-2 border rounded"
                    >
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <h4 className="italic text-gray-400">
                      Days to ban user for:
                    </h4>
                    <input
                      type="number"
                      name="user_bandays"
                      value={editedUser.user_bandays}
                      onChange={handleUserInputChange}
                      className="w-full p-2 mb-2 border rounded"
                      min="0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-gray-900 hover:bg-black text-white font-bold py-2 px-2 rounded"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleUserCancel}
                    className="mt-4 ml-2 bg-gray-900 hover:bg-black text-white font-bold py-2 px-2 rounded"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Item;
