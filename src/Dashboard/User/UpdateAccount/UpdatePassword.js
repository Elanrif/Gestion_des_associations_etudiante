import React from "react";
import FormPassword from "../../../Forms/FormPassword";
import Pannel from "../../../Forms/Pannel";

function UpdatePassword() {
  return (
    <div className="w-full flex items-center justify-center">
      <div>
        {" "}
        <Pannel
          title="Modifier votre Mot de passe"
          text="Renseigner tout les champ ci-desssous."
        />
        <div className="text-center">
          <FormPassword />
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
