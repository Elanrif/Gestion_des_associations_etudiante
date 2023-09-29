import React from "react";
import LeftAuth from "../../../Forms/LeftAuth";
import UpdatePassword from "./UpdatePassword";

const descp = (
  <span>
    Veuillez entrer vos données personnels pour rester connectez avec nous. et
    reçevoir tout les nouveaus informations.
  </span>
);

function UpdatePass() {
  return (
    <div className="flex justify-center h-[100vh] w-full">
      <LeftAuth name="Retour" content={descp} data="Modification de Mot de Passe"/>
      <UpdatePassword />
    </div>
  );
}

export default UpdatePass;
