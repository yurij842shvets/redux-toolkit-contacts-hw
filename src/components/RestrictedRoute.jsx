import { authReducer } from "../redux/slice/authSlice"
import {Navigate} from 'react-router'


export const RestrictedRoute = ({component: Component, redirectTo = '/' }) => {
    const {isLoggedIn} = authReducer()

    {isLoggedIn ? <Navigate redirectTo={redirectTo}/> : Component}
}

