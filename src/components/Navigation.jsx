import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navigation() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <>
      <Link to="/">Home</Link>
      {isLoggedIn && <Link to="/contacts">Contacts</Link>}
    </>
  );
}
