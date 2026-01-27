import { authReducer } from "../redux/slice/authSlice"
import {Navigate} from 'react-router'

export const PrivateRoute = ({component: Component, redirectTo = '/'}) => {
    const {isLoggedIn, isRefreshing} = authReducer()
    const route = !isLoggedIn && !isRefreshing

    {route ? <Navigate redirectTo={redirectTo}/> : Component}
}