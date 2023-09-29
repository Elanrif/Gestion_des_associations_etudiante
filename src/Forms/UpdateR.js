import React, { useContext } from "react";
import Pannel from "./Pannel";
import FormUpdate from "./FormUpdate";
import FormMembre from "../Dashboard/Admin/Membre/FormMembre";
import { MembreContext } from "./ContextData";

function UpdateR(props) {
  
  const mbreContext = useContext(MembreContext);

  const display = props.name === "membre" ? <FormMembre /> : <FormUpdate />;

  const play =
    props.name === "membre"
      ? /*  ("Modifier un Membre") */ mbreContext === "create"
        ? "Ajouer un Membre"
        : "Modifier un Membre"
      : "Modifier Les Informations";

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full ">
        <Pannel
          title={play}
          text="Veuillez renseigner tout les champ !."
          updateUser={true}
        />
        <div className="text-center">{display}</div>
      </div>
    </div>
  );
}

export default UpdateR;
