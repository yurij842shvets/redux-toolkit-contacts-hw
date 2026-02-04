import { useDispatch, useSelector} from "react-redux";
import {logOut} from '../redux/operations/contactsOperations'

export default function UserMenu() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    return (
        <>
        <div>
            <p>Welcome home {user?.name}</p>
            <button onClick={() => dispatch(logOut())}>Log out</button>
        </div>
        </>
    )
}