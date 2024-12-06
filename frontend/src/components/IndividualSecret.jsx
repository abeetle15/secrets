import "../styles/typing_space.css";

export default function IndividualSecret({ secret }) {
  return (
    <p id="individual-secret-p">
      {"> "}
      {secret || "_sistema_esperando_secretos_"}
    </p>
  );
}
