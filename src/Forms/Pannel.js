import React from 'react'
import {FaFacebook} from "react-icons/fa"
import { AiFillInstagram } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";


function Pannel(props) {

  const display = ()=>{
    if(props.name ==="updateAsso"){
      return (
        <>
          <h1 className="text-4xl capitalize font-extrabold text-orange-500 opacity-75">
           Modifier l'association
          </h1>
         
          <p className="center my-3 text-sm italic">mise à jour ...</p>
        </>
      );
    }
    else if(props.name ==="addAsso"){
      return (
        <>
          <h1 className="text-4xl capitalize font-extrabold text-orange-500 opacity-75">
            Ajouter une association
          </h1>

          <p className="center my-3 italic text-sm">créer votre association ...</p>
        </>
      );
    }
    else{

      if(props.updateUser === true) {
        return (
          <>
            <h1 className="text-4xl capitalize font-extrabold text-blue-500 opacity-75">
              {props.title}
            </h1>
          </>
        );
      }else{
        return (
          <>
            <h1 className="text-4xl capitalize font-extrabold text-green-500 opacity-75">
              {props.title}
            </h1>
            <div className="flex items-center justify-center space-x-5 mt-5">
            
            </div>
          </>
        );
      }
    }
  }


  return (
    <div className="text-center mt-10">
       {display()}
    </div>
  );
}

export default Pannel
