import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Parser } from "html-to-react";
import Navbar from "./Navbar";

const SinglePage = () => {
  const { slug } = useParams();
  const [state, setState] = useState("");

  //เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/box/${slug}`)
      .then((response) => {
        setState(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [slug]);

  const htmlParser = new Parser();

  return (
    <div>
      {state && (
        <div className="container ">
          <div>
            <Navbar />
          </div>
          <div>
            <img src={state.image} alt="" />
          </div>
          <div className="px-3">
            <h1>{state.title}</h1>
            <div>{htmlParser.parse(state.content)}</div>
            <p>
              author : {state.author} at{" "}
              {new Date(state.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default SinglePage;
