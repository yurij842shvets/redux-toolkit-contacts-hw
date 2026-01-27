import { Link } from "react-router";

export default function AuthNav() {
  return (
    <>
      <Link to="/register">register</Link>
      <Link to="/login">log in</Link>
    </>
  );
}
