import React, { useState, useEffect, useContext } from "react";
import Bureau from "./Bureau";
import { AssoContext } from "../../Dashboard/Admin/Context";

const users = [
  {
    id: 1,
    name: "Messi",
    status: "président",
    img: "/Membre/image/v1/messi.jpg",
    def: "Le secrétaire gère la documentation, prend note des réunions et facilite la communication interne.",
  },
  {
    id: 2,
    name: "Omar Sy",
    status: "tresorier",
    img: "/Membre/image/v1/omarsy.jpg",
    def: "Le président dirige l'association, représente ses membres, et supervise ses activités.",
  },
  {
    id: 3,
    name: "Bouchakhlit",
    status: "secretaire",
    img: "/Membre/image/v1/bouchalikht.jpg",
    def: "Le trésorier gère les finances de l'association, enregistre les transactions et assure la conformité budgétaire.",
  },
  { id: 4, name: "Utilisateur 3", status: "membre" },
  { id: 5, name: "Utilisateur 3", status: "membre" },
  // ... autres utilisateurs ...
];
// Utilisez la méthode filter() pour obtenir toutes les personnes membres
const membres = users.filter((user) => user.status === "membre");

// Utilisez la méthode slice() pour obtenir les trois premières personnes
const firstThreeUsers = users.slice(0, 3);

// Utilisez la méthode find() pour obtenir klk chose en specifique

function Membres(props) {
  
  const { association } = useContext(AssoContext);

  const [personal, setPersonal] = useState([]); /* on se doit d'initialiser si c'est un Tableau */

  /* pour éviter les case undefined ? associaion.bureaus && */



  useEffect(() => {

    display();

  }, []);

  
  const display = () => {
    
    const president =
      association.bureaus &&
      association.bureaus.find((bureau) => bureau.status === "Président");

    const vicePresident =
      association.bureaus &&
      association.bureaus.find((bureau) => bureau.status === "Vice-Président");

    const secretaire =
      association.bureaus &&
      association.bureaus.find((bureau) => bureau.status === "Sécretaire");

    /* le problème que j'ai rencontré en fait c'etait un problème de vérification
     *certains donnée manquait , et n'arrivait pas à acçeder,
     *SOLUTION : toujours verifier qu'on obtient bien la donnée */


    /* pour eviter des duplications . le 2eme aura ... pour prendre conscience du 1er president. */
    president  && setPersonal((prev) => [prev, { bureau: president }]);

    vicePresident &&
      setPersonal((prev) => [...prev, { bureau: vicePresident }]);

      /* je m'assure que les types aussi sont defined, en cas ou la const persident,..,secretai est undefined */
    secretaire && setPersonal((prev) => [...prev, { bureau: secretaire }]);
  };


  return (
    <div className="rounded-lg py-10 bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold">
          Les Principaux Membres du Bureau
        </h1>
        <p className="my-5 max-w-[25rem] text-slate-500 mx-auto">
          Veuillez découvrir les membres du Bureau de cette association. Chaque
          membre occupe bel et bien un poste particulier,sur ce découvrer par
          vous même.
        </p>
      </div>

      {/* centré un grid; on doit ajouté le nombre de fois que sera répeté Bureau dans grid-cols-? */}
      <div className="flex justify-center">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 lg:gap-y-0 gap-x-16`}
        >
          {personal &&
            personal.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {/* je vérifie que item.bureau != null , pour envoyer item. */}
                  {item.bureau && <Bureau avatar={item} />}
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Membres;
