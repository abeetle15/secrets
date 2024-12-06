import { Link } from "react-router-dom";
import "../styles/global.css";

export default function ErrorPage() {
  return (
    <div className="main-cont">
      <h1 className="header">Error</h1>
      <h2>Esta página no existe.</h2>
      <h2>
        Es mejor que vuelvas a <Link to={"/"}>casa</Link>
      </h2>
    </div>
  );
}
