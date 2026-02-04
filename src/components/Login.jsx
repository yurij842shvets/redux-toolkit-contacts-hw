import { useDispatch } from "react-redux";
import { logIn } from "../redux/operations/contactsOperations";

export default function Login() {
    const dispatch = useDispatch()

    const handleSubmit = e => {
      e.preventDefault()
      const form = e.currentTarget;
        dispatch(
          logIn({
            email: form.elements.email.value,
            password: form.elements.password.value
          })
        )
    }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
            Email
            <input type="email" name="email"/>
        </label>

        <label htmlFor="">
            Password
            <input type="password" name="password"/>
        </label>

        <button type="submit">Log In</button>
      </form>
    </>
  );
}
