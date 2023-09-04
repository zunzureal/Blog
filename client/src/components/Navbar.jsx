import { Link } from "react-router-dom";
import { getUser, logout } from "../../service/authorize";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate("/"));
    window.location.reload();
  };

  const post = () => {
    navigate("/create");
  };

  return (
    <nav>
      <ul className="flex justify-between px-3 pt-3">
        <li>
          <Link to="/">Home</Link>
        </li>
        {getUser() && <button onClick={post}>Post</button>}
        {!getUser() && <Link to="/login">Login</Link>}
        {getUser() && <button onClick={handleLogout}>Logout</button>}
      </ul>
    </nav>
  );
};

export default Navbar;
