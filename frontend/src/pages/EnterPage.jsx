import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import "../styles/forms.css";
import { Link } from "react-router-dom";

export default function EnterPage() {
  const { userIntent, setUserIntent } = useContext(UserContext);

  if (userIntent === "login") {
    return (
      <div className="main-cont" id="enter-main-cont">
        <h1 className="header">Bienvenidx a secretos.com</h1>
        <LoginForm />
        <p className="sub-header">
          si no tienes una cuenta,{" "}
          <span className="enter-link">
            {" "}
            <Link
              to={"/entra"}
              onClick={() => {
                setUserIntent("signup");
              }}
            >
              créala
            </Link>
          </span>
        </p>
      </div>
    );
  } else if (userIntent === "signup") {
    return (
      <div className="main-cont" id="enter-main-cont">
        <h1 className="header">Bienvenidx a secretos.com</h1>
        <SignupForm />
        <p className="sub-header">
          si ya eres miembro,{" "}
          <span className="enter-link">
            {" "}
            <Link
              to={"/entra"}
              onClick={() => {
                setUserIntent("login");
              }}
            >
              entra
            </Link>
          </span>
        </p>
      </div>
    );
  }
}
