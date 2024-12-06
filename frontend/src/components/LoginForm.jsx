// /* eslint-disable no-unused-vars */
import { useState } from "react";

import "../styles/forms.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleFormChange(e, field) {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form has been submited");
  }

  return (
    <form className="enter-form" id="login-form">
      <label htmlFor="usernameInput" className="login-input">
        usuario
      </label>
      <input
        type="text"
        name="usernameInput"
        id="usernameInput"
        value={formData.username}
        onChange={(e) => {
          handleFormChange(e, "username");
        }}
      />

      <label htmlFor="pwdInput" className="login-input">
        contraseña
      </label>
      <input
        type="password"
        name="pwdInput"
        id="pwdInput"
        value={formData.password}
        onChange={(e) => {
          handleFormChange(e, "password");
        }}
      />
      <button
        className="submit-btn"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        entra
      </button>
    </form>
  );
}
