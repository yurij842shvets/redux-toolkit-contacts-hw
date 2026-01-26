import { BrowserRouter, Route, Routes } from "react-router";
import Navigation from "./components/Navigation";
import Home from './components/Home'
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
