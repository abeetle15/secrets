import "../styles/typing_space.css";
import "../styles/secret_hub.css";

export default function TypingSpace({ secret, setSecret }) {
  const maxCharacters = 400;

  function handleSubmit(e) {
    e.preventDefault();
    console.log("secret posted");
  }

  function handleChange(e) {
    if (e.target.value.length <= maxCharacters) {
      setSecret(e.target.value);
    }
  }

  return (
    <div id="typing-main-cont">
      <textarea
        type="text"
        id="text-input"
        name="text-input"
        value={secret}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <div id="btn-cont">
        <button
          className="text-btn"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          publica tu secreto
        </button>
        <button
          className="text-btn"
          onClick={() => {
            console.log("going to settings");
          }}
        >
          configuración
        </button>
      </div>
    </div>
  );
}
