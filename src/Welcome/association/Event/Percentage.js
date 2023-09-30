import React,{useContext,useState,useEffect} from 'react'
import { AssoContext } from '../../../Dashboard/Admin/Context';

function Percentage() {

  const { association } = useContext(AssoContext);

  return (
    <div className="my-4 flex justify-center">
      <div className="grid grid-cols-1 gap-y-2 lg:gap-y-0 lg:grid-cols-3">
        <div>
          <h1 className="text-3xl text-slate-200 hover:text-slate-400 duration-300 font-black">
            {association.benevoles.length > 0
              ? `${association.benevoles.length} Bénevole(s)`
              : "Aucun Bénevole"}
          </h1>
        </div>

        <div>
          <h1 className="text-3xl text-slate-200 hover:text-slate-400 duration-300 font-black">
            {association.events.length > 0
              ? `${association.events.length} Évènement(s)`
              : "Aucun Bénevole"}
          </h1>
        </div>
        <div>
          <h1 className="text-3xl text-slate-200 hover:text-slate-400 duration-300 font-black">
            {association.comments.length > 0
              ? `${association.comments.length} commentaire(s)`
              : "Aucun Commentaire"}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Percentage
