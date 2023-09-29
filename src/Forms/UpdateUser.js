import React,{useContext} from 'react'
import UpdateR from "./UpdateR";
import LeftAuth from "./LeftAuth";
import { UserContext } from './ContextData';

const descp = (
  <span>
    Veuillez entrer vos données personnels pour rester connectez avec nous. et
    reçevoir tout les nouveaus informations.
  </span>
);


function UpdateUser(props) {

  return (
    <div className="flex justify-center h-[100vh] w-full">
      <LeftAuth name="Retour" content={descp} data="Modification du compte" admin={true}/>
      <UserContext.Provider value={props.person}>
        <UpdateR />
      </UserContext.Provider>
    </div>
  );
}

export default UpdateUser
