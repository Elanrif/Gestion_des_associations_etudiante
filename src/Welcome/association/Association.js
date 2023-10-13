import React, { useState, useEffect } from "react";
import Header from "./Header";
import Membres from "./Membres";
import AllMembres from "./AllMembres";
import Event from "./Event";
import Comment from "./Event/Comment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AssoContext } from "../../Dashboard/Admin/Context";
import BackDrop from "../../BackDrop";

const Association = () => {

  const { associationID } = useParams();

  const [association, setAssociation] = useState(null);

  const [play, setPlay] = useState(null)

  useEffect(() => {
    display();
  }, [play]); 

  const display = () => {
    axios
      .get(`http://localhost:8080/association/find/${associationID}`)
      .then((res) => {
        setAssociation(res.data);
      })
      .catch((err) => {
        console.log("err : ", err);
      });
  };

  /* Meilleur façon de faire , toujours vérifier dans le return association && */
  return (
    <>
      {association ? (
        <AssoContext.Provider value={{ association, setPlay,play }}>
          <Header />
          {/* juste on s'asssure que s'il bureaus est undefine on aura pas des erreurs */}
          {association.bureaus?.length > 0 ? (
            <>
              <Membres />
              <AllMembres />
            </>
          ) : (
            <div className="pt-5 my-16 text-center text-3xl font-black ps-3 text-slate-300">
              {" "}
              Aucun Membre de bureau.
            </div>
          )}

          {association.events?.length > 0 ? (
            <Event />
          ) : (
            <div className="pt-5 text-center text-3xl font-black ps-3 text-slate-300">
              {" "}
              Aucun évènement pour l'association.
            </div>
          )}

          {/* on gérer ces choses la à l'interieur de Comment */}
          <Comment />
        </AssoContext.Provider>
      ) : (
        <div className="h-[60vh]">
          {/* par défaut tjrs on va entrer ici car useState association est à null. */}
          
            <BackDrop/>
        </div>
      )}
    </>
  );
};

export default Association;
