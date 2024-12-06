import { useState } from "react";
import SecretsDisplay from "../components/SecretsDisplay";
import TypingSpace from "../components/TypingSpace";
import "../styles/secret_hub.css";

export default function SecretHub() {
  const [secret, setSecret] = useState("");
  return (
    <>
      <div id="main-board">
        <SecretsDisplay secret={secret} />
        <TypingSpace secret={secret} setSecret={setSecret} />
      </div>
    </>
  );
}
