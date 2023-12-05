import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <Link to="/home">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Navigation;
