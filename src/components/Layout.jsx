import { Outlet } from "react-router";
import AppBar from "./AppBar";
import { Suspense } from "react";

export default function Layout() {
  return(<>
  <div>
    <AppBar/>
    <Suspense fallback={<p>Loading...</p>}>
        <Outlet/>
    </Suspense>

  </div>
  </>);
}
