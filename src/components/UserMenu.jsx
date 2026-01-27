import { useDispatch } from "react-redux";
import {logOut} from '../redux/operations/contactsOperations'
import {authReducer} from '../redux/slice/authSlice'

export default function UserMenu() {
    const dispatch = useDispatch()
    const user = authReducer()

    return (
        <>
        <div>
            <p>Welcome home {user.name}</p>
            <button onClick={() => dispatch(logOut)}>Log out</button>
        </div>
        </>
    )
}