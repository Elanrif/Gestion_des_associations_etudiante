import React from 'react'
import { Link } from "react-router-dom";


function Left(props) {

    const display  = ()=>{
        if(props.update === true){
            return (
              <>
                <div className="absolute h-full w-full top-0 left-0 bg-orange-500 opacity-75"></div>
                <img
                  src="/Evenement/images/asso_culturelle.png"
                  className="h-full w-full"
                />
                <div className="text-white xl:block hidden absolute px-1 top-[50%]">
                  <h1 className="uppercase text-xl md:text-3xl font-extrabold">
                    Modifier l'association
                  </h1>
                  <p className="my-5 max-w-[30rem]"> Bienvenu, dans le formulaire pour modifier les informations conçernant l'association
                  . Assurez-vous de remplir tout les champs.</p>
                  <Link
                    to="/dashboard/admin/associations"
                    className="ring-2 mt-5 ring-white font-bold hover:ring-cyan-300 px-4 text-xl py-2 uppercase rounded-full"
                  >
                    retour
                  </Link>
                </div>
              </>
            );
        }else if(props.add  === true){
            return (
              <>
                <div className="absolute h-full w-full top-0 left-0 bg-orange-500 opacity-75"></div>
                <img
                  src="/Evenement/images/asso_culturelle.png"
                  className="h-full w-full"
                />
                <div className="text-white xl:block hidden absolute px-1 top-[50%]">
                  <h1 className="uppercase text-xl md:text-3xl font-extrabold">
                    Ajouter une association
                  </h1>
                  <p className="my-5 max-w-[30rem]">
                    {" "}
                    Bienvenu, créer une association qui aura un impact sur la vie estudiantine. Assurez-vous de remplir tout les
                    champs.
                  </p>
                  <Link
                    to="/dashboard/admin/associations"
                    className="ring-2 mt-5 ring-white font-bold hover:ring-cyan-300 px-4 text-xl py-2 uppercase rounded-full"
                  >
                    retour
                  </Link>
                </div>
              </>
            );
        }else{
            return(<p> Error</p>)
        }
    }
  return (
      <div className="xl:flex hidden relative items-center justify-center  w-[70%]">
         {display()}
      </div>
  );
}

export default Left
