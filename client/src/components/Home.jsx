import { useState, useEffect } from "react";
import axios from "axios";
import { Parser } from "html-to-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [boxes, setBoxes] = useState([]);

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/boxes`)
      .then((response) => setBoxes(response.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const htmlParser = new Parser();
  return (
    <div className="container">
      <div className="pb-3"></div>
      <div className="flex flex-col">
        {boxes.map((box) => (
          <div key={box._id} className="p-3 border rounded-md">
            <div className="grid grid-cols-3">
              <div className="w-full h-full xl:w-64 xl:h-full">
                <img src={box.image} alt="" className="h-50 w-40" />
              </div>
              <div className="col-span-2 pl-3">
                <Link
                  className="text-red-500 underline-none"
                  to={`/box/${box.slug}`}
                >
                  {box.title}
                </Link>
                <div className="h-full text-xs ">
                  {htmlParser.parse(box.content.substring(0, 300))}
                  <p>{box.author}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
