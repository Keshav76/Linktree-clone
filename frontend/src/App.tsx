import {
  createHashRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Url from "./pages/Url";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Signin />} />,
      <Route path="/signup" element={<Signup />} />,
      <Route path="/admin" element={<Admin />} />,
      <Route path="/links/:url" element={<Url />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
