import "react-quill/dist/quill.snow.css";
import { useState, } from "react";
import "../index.css";
import axios from "axios";
import Swal from "sweetalert2";
import { authentication} from "../../service/authorize";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = state;

  //user
  const inputUsername = (event) => {
    setState((prevData) => ({
      ...prevData,
      username: event.target.value,
    }));
  };
  //password
  const inputPassword = (event) => {
    setState((prevData) => ({
      ...prevData,
      password: event.target.value,
    }));
  };

  //navigate middleware
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_REACT_API_URL}/login`, {
        username,
        password,
      })
      .then((response) => {
        console.table({ username, password });
        authentication(response, () => navigate("/dashboard"));
        console.log(response);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
        console.log(err);
      });
  };
  //check ถ้าเปิด login.jsxแล้ว ถ้ามีค่า getUser แล้ว redirect ไปที่ หน้าแรก

  return (
    <div className="container h-screen">
      <Navbar />
      <div className="lg:flex-r xl:flex-row sm:flex">
      <div className=" flex justify-center w-full">
        <img src="https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/6099119905dc8225f36ebb25_69.png" className=" w-2/3"/>
      </div>
      <div className=" lg:flex xl:flex">
        <form onSubmit={submit} className="flex justify-center xl:items-center lg:items-center">
        <div className="">
          <div className="form-group">
            <label>username</label>
            <br />
            <input
              type="text"
              value={username}
              onChange={inputUsername}
              className="border"
            />
          </div>

          <div className="form-group">
            <label>password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={inputPassword}
              className="border"
            />
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="text-m p-1.5 w-full border-solid border-2 border-gray-100 rounded bg-blue-600 text-white"
            >
              login
            </button>
          </div>
        </div>
      </form>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
