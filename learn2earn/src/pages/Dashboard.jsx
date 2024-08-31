import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import ItemList from "../components/ItemList.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Physical", value: 400 },
  { name: "PDF", value: 300 },
];
const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul
      style={{
        listStyleType: "none",
        padding: 0,
        margin: 0,
        textAlign: "center",
      }}
    >
      {payload.map((entry, index) => (
        <li style={{ color: "black", marginBottom: 4 }}>
          <span style={{ marginRight: 8, color: entry.color }}>■</span>
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

const COLORS = ["#000000", "#D1D5DB"]; // Black and gray

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textColor = index === 1 ? "black" : "white";

  return (
    <text
      x={x}
      y={y}
      fill={textColor}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function Dashboard({ isAuth, name, categories }) {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [bookOwners, setBookOwners] = useState([]);
  const [manage, setManage] = useState("manageUsers");

  async function getBooks() {
    try {
      const response = await fetch("http://localhost:8000/books/itemlist", {
        method: "GET",
      });
      const parseRes = await response.json();
      const booksList = parseRes.map((book) => ({
        author: book.book_author,
        name: book.book_name,
        genre: book.book_genre,
        points: book.book_points,
        type: book.book_type,
      }));
      setAllBooks(booksList);
      setBooks(booksList);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getBooks();
  }, [manage]);

  async function getUsers() {
    try {
      const response = await fetch("http://localhost:8000/dashboard/getusers", {
        method: "GET",
      });
      const parseRes = await response.json();
      const userList = parseRes.map((user) => ({
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_area: user.user_area,
        user_points: user.user_points,
        isadmin: user.isadmin,
        isbanned: user.isbanned,
        bandays: user.bandays,
      }));
      setAllUsers(userList);
      setUsers(userList);
    } catch (error) {
      console.error(error.message);
    }
  }

  let top5Userpoints = [...users]
    .sort((a, b) => b.user_points - a.user_points)
    .slice(0, 5);

  async function getTopOwners() {
    try {
      const response = await fetch("http://localhost:8000/books/topowners", {
        method: "GET",
      });
      const parseRes = await response.json();
      const topOwners = parseRes.map((owner) => ({
        username: owner.user_name,
        books: owner.frequency,
      }));
      setBookOwners(topOwners);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, [manage]);

  useEffect(() => {
    getTopOwners();
  }, [manage]);

  const handleUsersClick = () => {
    getUsers();
  };

  const handleBooksClick = () => {
    getBooks();
  };

  const navigate = useNavigate();

  return (
    <>
      <Navbar isAuth={isAuth} name={name} />

      <div className="pt-28"></div>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`w-40 rounded-2xl border-2 hover:border-gray-500 p-2 focus:outline-none ${
            manage === "manageUsers"
              ? "bg-black text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => {
            handleUsersClick();
            setManage("manageUsers");
          }}
        >
          Manage Users
        </button>
        <button
          className={`w-40 rounded-2xl border-2 hover:border-gray-500 p-2 focus:outline-none ${
            manage === "manageBooks"
              ? "bg-black text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => {
            handleBooksClick();
            setManage("manageBooks");
          }}
        >
          Manage Books
        </button>
        <button
          className={`w-40 rounded-2xl border-2 hover:border-gray-500 p-2 focus:outline-none ${
            manage === "graphs"
              ? "bg-black text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => setManage("graphs")}
        >
          Graphs
        </button>
        <button
          className={`w-40 rounded-2xl border-2 hover:border-gray-500 p-2 bg-gray-100 text-black focus:outline-none`}
          onClick={() => {
            navigate("/settings");
          }}
        >
          Settings
        </button>
      </div>

      {manage === "manageUsers" && (
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <ItemList
              items={users}
              willOverlay={true}
              setItems={setUsers}
              logged_name={name}
              type={"users"}
            />
          </div>
          <Sidebar
            categories={categories}
            isAuth={isAuth}
            name={name}
            type={"users"}
            className="lg:w-1/3"
          />
        </div>
      )}

      {manage === "manageBooks" && (
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <ItemList
              items={books}
              willOverlay={true}
              setItems={setBooks}
              logged_name={name}
              type={"books"}
            />
          </div>
          <Sidebar
            categories={categories}
            isAuth={isAuth}
            name={name}
            type={"books"}
            className="lg:w-1/3"
          />
        </div>
      )}

      {manage === "graphs" && (
        <div className="flex flex-col space-y-8 mt-10">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="relative w-full lg:w-1/2 h-96">
              <h3 className="absolute top-0 left-1/2 transform -translate-x-1/2 font-semibold bg-white px-2 py-1 z-10">
                Books by Type
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    innerRadius={0}
                    fill="#8884d8"
                    stroke="#000000"
                    strokeWidth={1}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    content={renderLegend}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="unordered-list-container lg:w-1/2">
              <ul className="unordered-list">
                <li>Dummy text 1</li>
                <li>Dummy text 2</li>
                <li>Dummy text 3</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="relative w-full lg:w-1/2 h-96">
              <h3 className="absolute top-0 left-1/2 transform -translate-x-1/2 font-semibold bg-white px-2 py-1 z-10">
                Top 5 Users by Points
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={top5Userpoints}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="user_name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="user_points"
                    fill="#000000"
                    barSize={50}
                    name="Points"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="unordered-list-container lg:w-1/2">
              <ul className="unordered-list">
                <li>Dummy text 1</li>
                <li>Dummy text 2</li>
                <li>Dummy text 3</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="relative w-full lg:w-1/2 h-96">
              <h3 className="absolute top-0 left-1/2 transform -translate-x-1/2 font-semibold bg-white px-2 py-1 z-10">
                Top 5 Users by Books
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bookOwners}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="username" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="books"
                    fill="#000000"
                    barSize={50}
                    name="Books"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="unordered-list-container lg:w-1/2">
              <ul className="unordered-list">
                <li>Dummy text 1</li>
                <li>Dummy text 2</li>
                <li>Dummy text 3</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
