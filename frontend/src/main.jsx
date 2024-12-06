import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import "./styles/reset.css";
import { UserContextProvider } from "./context/UserContext.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import EnterPage from "./pages/EnterPage.jsx";
import SecretHub from "./pages/SecretHub.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/entra",
    element: <EnterPage />,
  },
  {
    path: "/secretos",
    element: <SecretHub />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>
);
