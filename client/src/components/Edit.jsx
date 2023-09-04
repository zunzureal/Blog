import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import "../index.css";
import { useParams } from "react-router-dom";
import { getToken } from "../../service/authorize";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Edit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const { title, content, author } = formData;

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

  const submitContent = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      content: event,
    }));
  };

  const { slug } = useParams();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/box/${slug}`)
      .then((response) => {
        const { title, content, author, slug } = response.data;
        setFormData({ ...formData, title, content, author, slug });
      })
      .catch((err) => {
        alert(err);
      });
  }, [slug]);
  const submit = (e) => {
    e.preventDefault();

    axios
      .put(
        `${import.meta.env.VITE_REACT_API_URL}/box/edit/${slug}`,
        {
          title,
          content,
          author,
          slug,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        Swal.fire("COOL!", "UPDATED!", "success");
        const { title, content, author, slug } = response.data;
        setFormData({ ...formData, title, author, content, slug });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  };

  //check and redirect

  return (
    <div className="container">
      <Navbar />
      <form onSubmit={submit} className="space-y-4 px-3 pt-3">
        <div className="form-group">
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={inputTitle}
            className="border-2 border-300"
          />
        </div>
        <div className="form-group w-full h-1/2">
          <label>Content</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            placeholder="Description"
            theme="snow"
            className="pt-5 h-full"
          />
        </div>
        <div>
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
            className="text-m py-3 border-solid border-2 border-300 rounded w-2/3"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
