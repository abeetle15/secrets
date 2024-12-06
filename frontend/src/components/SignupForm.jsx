// /* eslint-disable no-unused-vars */
import { useState } from "react";
import postNewUser from "../services/postNewUser";
import "../styles/forms.css";

export default function SignupForm() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPwd: "",
  });

  function handleFormChange(e, field) {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPwd) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await postNewUser(formData.username, formData.password);
      setSuccess("Success! Your account has been created");
      setFormData({
        username: "",
        password: "",
        confirmPwd: "",
      });
    } catch (error) {
      setError("Account was not created.");
    }
  }

  return (
    <form className="enter-form" id="signup-form">
      <div id="bloque-inputs">
        <label htmlFor="usernameInput" className="login-input">
          usuario:
        </label>
        <input
          type="text"
          name="usernameInput"
          id="usernameInput"
          className="signup-input"
          value={formData.username}
          onChange={(e) => {
            handleFormChange(e, "username");
          }}
        />

        <label htmlFor="pwdInput" className="login-input">
          contraseña:
        </label>
        <input
          type="password"
          name="pwdInput"
          id="pwdInput"
          className="signup-input"
          value={formData.password}
          onChange={(e) => {
            handleFormChange(e, "password");
          }}
        />
      </div>

      <label htmlFor="confirmPwd" className="login-input">
        confirma tu contraseña
      </label>
      <input
        type="password"
        name="confirmPwd"
        id="confirmPwd"
        value={formData.confirmPwd}
        onChange={(e) => {
          handleFormChange(e, "confirmPwd");
        }}
      />
      <button
        className="submit-btn"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        crea
      </button>
    </form>
  );
}
