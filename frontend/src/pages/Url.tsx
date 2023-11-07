import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";
import axios from "axios";

interface Link {
  title: string;
  url: string;
  _id: string;
}

const LinkTreePage = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const url = useParams().url || "admin";
  console.log(url);
  useEffect(() => {
    axios
      .get("/api/users/links/" + url)
      .then((res) => {
        setLinks(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLinks([]);
      });
  }, []);

  return (
    <div className="flex flex-col items-center  min-h-screen bg-[#85FFBD] bg-[linear-gradient(45deg,#85FFBD_0%,#FFFB7D_100%)]">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl font-semibold text-[#1c6b41] mt-[20vh] mb-10 text-center">
          @{url}
        </h1>
        {links.map((link, index) => (
          <a
            target="_blank"
            href={"https://" + link.url}
            key={index}
            className="hover:scale-105 transition-all duration-500 flex items-center justify-between py-4 px-6 mx-2 text-xl mb-4 bg-white rounded-xl shadow-md"
          >
            <div className="text-[#1c6b41] hover:underline">{link.title}</div>
            <div className="text-[#1c6b41] py-1 px-2 rounded-lg">
              <BiLinkExternal />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinkTreePage;
