import React, { useContext } from "react";
import { GlobalContext } from "../context";
function SecretPAge() {
  const [user] = useContext(GlobalContext);
  return (
    <div>
      <h1>Página secreta</h1>
      {user && user.username}
    </div>
  );
}

export default SecretPAge;
