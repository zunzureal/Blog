import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";
import Form from "./components/Form";
import Login from "./components/Login";
import SinglePage from "./components/SinglePage";
import App from "./App";
import { getUser } from "../service/authorize";
import Dashboard from "./components/AdminDashboard/Dashboard";
const MyRoute = () => {
  const isLoggedIn = getUser(); // ตรวจสอบว่ามีการ login หรือไม่
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/box/:slug" element={<SinglePage />} />

        {isLoggedIn ? (
          <>
            <Route path="/create" element={<Form />} />
            <Route path="/box/edit/:slug" element={<Edit />} />
          </>
        ) : (
          <>
            <Route path="/create" element={<Navigate to="/login" />} />
            <Route path="/box/edit/:slug" element={<Navigate to="/login" />} />
          </>
        )}

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
export default MyRoute;
