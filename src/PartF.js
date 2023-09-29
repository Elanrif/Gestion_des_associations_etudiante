import React, { useState } from "react";
import axios from "axios";

function PartF() {
  const [formData, setFormData] = useState({
    file: null, // Champ de fichier
    name: "",
    desc: "",
    price: 0,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      // Gestion du champ de fichier
      setFormData({
        ...formData,
        file: e.target.files[0], // Mettez à jour avec le fichier sélectionné
      });
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataa = new FormData();
    formDataa.append("file", formData.file); // Champ de fichier
    formDataa.append("name", formData.name);
    formDataa.append("desc", formData.desc);
    formDataa.append("price", formData.price.toString()); // Convertir en chaîne  .toString()

    axios
      .post("http://localhost:8081/v1/upload", formDataa, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        // Traitez la réponse du serveur ici
        console.log(response.data);
      })
      .catch((error) => {
        // Gérez les erreurs ici
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4 p-5 text-center">
          {formData.file && (
            <img
              src={URL.createObjectURL(formData.file)}
              alt="Image affichée"
              className="w-32 h-32 mx-auto rounded-full"
            />
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600">
            Nom :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-600">
            Description :
          </label>
          <input
            type="text"
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-600">
            Prix :
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-600">
            Fichier :
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange} // Gestion du champ de fichier
            className="w-full py-2 focus:outline-none"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

export default PartF;
