import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function GetWorkUser() {

    const {id} = useParams() ; 
    
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
  });

  useEffect(() => {
    // Remplacez 'localhost:8081/v1/product/1' par l'URL correcte de votre API
    axios
      .get(`http://localhost:8081/v1/user/${id}`)
      .then((response) => {
        const { name, description, price, image } = response.data;

        // Mettez à jour l'état avec les données de l'utilisateur
        setUserData({
          name,
          description,
          price,
          image,
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto my-4">
      <h1 className="text-2xl font-semibold mb-2">
        Nom de l'utilisateur : {userData.name}
      </h1>
      <p className="text-gray-600 mb-2">Description : {userData.description}</p>
      <p className="text-gray-600 mb-2">Prix : {userData.price}</p>
      <img
        src={`data:image/jpeg;base64,${userData.image}`}
        alt="Image de l'utilisateur"
        className="max-w-full h-auto rounded-lg"
      />
    </div>
  );
}

export default GetWorkUser;

