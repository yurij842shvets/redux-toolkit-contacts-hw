import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Contacts from "./components/Contacts";
import Layout from "./components/Layout";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { Component } from "react";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/register" element={<RestrictedRoute redirectTo="/contacts"/> } component={<Register/>}/>
            <Route path="/login" element={<RestrictedRoute redirectTo="/contacts"/> } component={<Login/>}/>
            <Route path="/components" element={<PrivateRoute redirectTo='/login'/>} component={<Contacts/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
