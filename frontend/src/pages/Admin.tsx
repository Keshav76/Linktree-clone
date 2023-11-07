import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { BiLinkExternal } from "react-icons/bi";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

interface Url {
  id: number;
  title: string;
  url: string;
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<any>({});
  const [urls, setUrls] = useState<Url[]>([]);
  const username: string = useLocation().state.username || "";

  useEffect(() => {
    axios
      .post("/api/users", { username })
      .then((res) => {
        setUser(res.data);
        axios
          .get("/api/users/links/" + res.data.url)
          .then((res) => {
            setUrls(res.data);
          })
          .catch((err) => {
            console.log(err);
            setUrls([]);
          });
      })
      .catch((err) => console.log(err));
  }, []);

  const [newUrl, setNewUrl] = useState<Url>({ id: 0, title: "", url: "" });

  const handleAddUrl = () => {
    setUrls([...urls, { ...newUrl, id: urls.length + 1 }]);
    axios
      .post("/api/users/add/" + user.username, { ...newUrl })
      .catch((err) => console.log(err));
    setNewUrl({ id: 0, title: "", url: "" });
  };

  const handleDeleteUrl = (title: string) => {
    setUrls(urls.filter((url) => url.title !== title));
    axios
      .post("/api/users/delete/" + user.username, { title })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-screen h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-semibold mb-10 text-gray-800">
        Admin
        <button className="text-white py-1 rounded-lg px-3 text-3xl bg-red-600 hover:bg-red-800 cursor-pointer float-right">
          <Link to={"/"}>Logout</Link>
        </button>
      </h1>
      <h2>
        <Link
          to={"/links/" + user.url}
          className="flex items-center gap-2 text-2xl font-semibold mb-4 text-gray-800"
        >
          Your Website <BiLinkExternal />
        </Link>
      </h2>
      <div className="mb-10 flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Title"
          className="flex-grow p-4 mr-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
          value={newUrl.title}
          onChange={(e) => setNewUrl({ ...newUrl, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL"
          className="flex-grow p-4 mr-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
          value={newUrl.url}
          onChange={(e) => setNewUrl({ ...newUrl, url: e.target.value })}
        />
        <button
          onClick={handleAddUrl}
          className="bg-blue-500 text-white py-2 px-4 mr-2 rounded hover:bg-blue-600"
        >
          Add URL
        </button>
      </div>
      <ul className="md:h-2/3 h-1/2 overflow-y-scroll overflow-x-hidden">
        {urls.map((url) => (
          <li
            key={url.id}
            className="mb-4 p-4 rounded-lg bg-white shadow-md flex items-center justify-between"
          >
            <div>
              <p className="text-xl text-gray-800">{url.title}</p>
              <a
                href={"https://" + url.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {url.url}
              </a>
            </div>
            <button
              onClick={() => handleDeleteUrl(url.title)}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              <FiTrash size={24} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
