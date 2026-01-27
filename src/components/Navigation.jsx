import { Link } from "react-router";
import { authReducer } from "../redux/slice/authSlice";

export default function Navigation() {
  const { isLoggedIn } = authReducer();

  return (
    <>
      <Link to="/">Home</Link>
      {isLoggedIn && <Link to="/contacts">Contacts</Link>}
    </>
  );
}
