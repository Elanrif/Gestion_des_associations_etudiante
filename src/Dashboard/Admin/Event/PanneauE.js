import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";

export default function PanneauE(props) {
  const display = () => {
    if (props.name === "update") {
      return (
        <>
          <h1 className="text-4xl capitalize font-extrabold text-cyan-600 opacity-75">
            Modifier un évènement 
          </h1>
        </>
      );
    } else if (props.name === "add") {
      return (
        <>
          <h1 className="text-4xl capitalize font-extrabold text-cyan-600 opacity-75">
            Ajouter un évenement
          </h1>
        </>
      );
    } else {
      <>ERROR !</>;
    }
  };

  return <div className="text-center mt-10">{display()}</div>;
}

