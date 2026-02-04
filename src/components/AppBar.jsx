import AuthNav from "./AuthNav";
import Navigation from "./Navigation";
import UserMenu from "./UserMenu";
import { useSelector } from "react-redux";

export default function AppBar() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <div>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
}
