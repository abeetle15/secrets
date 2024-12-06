import IndividualSecret from "./IndividualSecret";

export default function SecretsDisplay({ secret }) {
  return (
    <div id="display-main-cont">
      <IndividualSecret secret={secret} />
    </div>
  );
}
