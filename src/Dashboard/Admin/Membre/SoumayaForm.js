import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddAssociation() {
  const navigate = useNavigate();
  const [association, setAssociation] = useState({
    name: "",
    codeCDP: "",
    centreId: "" , // Initialisez à 0 (ou une valeur par défaut appropriée)
  });
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/centre/all")
      .then((res) => {
        setCentres(res.data);
      })
      .catch((err) => {
        console.log("Erreur lors du chargement des centres : ", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssociation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Association : ", association);

    const data = {
      name : association.name,
      codeCDP : association.codeCDP
    }

    const Id = parseInt(association.centreId, 10); ; 

    console.log(" data : ", data, " centre ID : ", Id);
    
    axios
      .post(`http://localhost:8080/association/v2/save`, {
        data,
        params :{
          "centreId" : Id
        }
      })
      .then((res) => {
        console.log("Association ajoutée avec succès");

        setAssociation({
          name: "",
          codeCDP: "",
          centre_id: "",
        });

        navigate("/list/associations");
      })
      .catch((err) => {
        alert("Erreur : " + err);
      });
  };

  const button =
    association.name === "" ||
    association.codeCDP === "" ||
    association.centre_id === null ? (
      <button type="submit" className="" disabled>
        Ajouter
      </button>
    ) : (
      <button type="submit" className="">
        Ajouter
      </button>
    );

  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="">Ajouter une nouvelle association</div>
          <form className="" onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="name" className="">
                Nom :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={association.name}
                className=""
                placeholder="Entrez le nom de l'association..."
                onChange={handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="codeCDP" className="">
                Code centre :
              </label>
              <input
                type="text"
                id="codeCDP"
                name="codeCDP"
                value={association.codeCDP}
                className=""
                placeholder="Entrez le code du centre..."
                onChange={handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="centre_id" className="">
                Centre :
              </label>
              <select
                id="centre_id"
                name="centre_id"
                value={association.centre_id}
                onChange={handleChange}
              >
                <option value={0}>Sélectionnez un centre</option>{" "}
                {/* Initialisez à 0 */}
                {centres.map((centre) => (
                  <option key={centre.centreId} value={centre.centreId}>
                    {centre.name}
                  </option>
                ))}
              </select>
            </div>

            {button}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAssociation;
