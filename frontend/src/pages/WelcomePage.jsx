import { Link } from "react-router-dom";
import "../styles/welcome.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function WelcomePage() {
  const { setUserIntent } = useContext(UserContext);

  return (
    <div className="main-cont">
      <h1 className="header">Bienvenidx a secretos.com</h1>
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
      <img
        id="rotating-gif"
        src="../assets/images/computer-rotating.gif"
        alt="computer rotating"
      />
    </div>
  );
}
