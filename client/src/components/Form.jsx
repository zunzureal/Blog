import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../../service/authorize";
import Navbar from "../components/AdminDashboard/Navbar";
const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: getUser(),
    image: "",
  });

  const { title, content, author, image } = formData;

  const inputTitle = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      title: event.target.value,
    }));
  };

  const inputAuthor = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      author: event.target.value,
    }));
  };

  const inputImage = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      image: event.target.value,
    }));
  };

  const submitContent = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      content: event,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(getToken());
    axios
      .post(
        `${import.meta.env.VITE_REACT_API_URL}/create`,
        {
          title,
          content,
          author,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Good job!", "SAVED!", "success");

        setFormData({
          ...formData,
          title: "",
          author: "",
          content: "",
          image: "",
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data,
        });
        console.log(err);
      });
  };
  const navigate = useNavigate();
  return (
    <div className="container">
      <Navbar />
      <form onSubmit={submit} className="px-3 pt-3">
        <div className="space-y-8">
          <div className="form-group">
            <label>Title</label>
            <br />
            <input
              type="text"
              value={title}
              onChange={inputTitle}
              className=" border-2 border-gray-300"
            />
          </div>
          <div className="form-group">
            <label>Image Link</label>
            <br />
            <input
              type="text"
              value={image}
              onChange={inputImage}
              className=" border-2 border-gray-300 w-full"
            />
          </div>
          <div className="form-group h-52">
            <label>Content</label>
            <ReactQuill
              value={content}
              onChange={submitContent}
              placeholder="Description"
              theme="snow"
              style={{ height: "150px" }}
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <br />
            <input
              type="text"
              value={author}
              onChange={inputAuthor}
              className="border-2 border-gray-300 w-1/2"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-m py-3 border-solid border-2 border-300 rounded w-2/3 "
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
