import { useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'

export const PrivateRoute = ({children, redirectTo = '/'}) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const isRefreshing = useSelector(state => state.auth.isRefreshing)
    const shouldRedirect = !isLoggedIn && !isRefreshing

    return shouldRedirect ? <Navigate to={redirectTo}/> : children
}