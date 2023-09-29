import React from "react";
import UpdateR from "./UpdateR";
import LeftAuth from "./LeftAuth";

const descp = (
  <span>
    Veuillez entrer vos données personnels pour rester connectez avec nous. et
    reçevoir tout les nouveaus informations.
  </span>
);

function Update() {
  return (
    <div className="flex justify-center h-[100vh] w-full">
      <LeftAuth name="Retour" content={descp} data="Modification du compte"/>
      <UpdateR />
    </div>
  );
}

export default Update;
