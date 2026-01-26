import { Link } from "react-router";

export default function Navigation() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/register">register</Link>
      <Link to="/login">log in</Link>
    </>
  );
}
