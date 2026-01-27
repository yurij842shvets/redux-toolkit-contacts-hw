import AuthNav from "./AuthNav"
import Navigation from "./Navigation"
import UserMenu from "./UserMenu"
import { authReducer } from "../redux/slice/authSlice"

export default function AppBar() {
    const {isLoggedIn} = authReducer()

    return (
        <div>
            <Navigation/>
            {isLoggedIn ? <UserMenu/> : <AuthNav/>}
        </div>
    )
}