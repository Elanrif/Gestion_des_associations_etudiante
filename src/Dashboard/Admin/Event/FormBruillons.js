import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import Pannel from "../../../Forms/Pannel";
import axios from "axios";

export default function FormE(props) {
  const navigate = useNavigate();

  const { assoId } = useParams();

  const [association, setAssociation] = useState({
    id: null,
    name: "",
    def: "",
    desc: "",
    date: "",
    image: null,
  });

  /* sur javaScript, si on initialise une variable avec un type par défaut. ben c'est comme si cette variable est de ce type
  ici si tu changes ... date : "" , il ne sera pas affiché sur le formulaire car il le considerera comme du texte, alors que le type 
  <input type="date"/> n'est pas une chaine de caractère */
  const [updateAsso, setUpdateAsso] = useState({
    name: "",
    def: "",
    desc: "",
    date: null,
    image: null,
  });

  const [playImg, setPlayImg] = useState(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    display();
  }, []);

  const display = () => {
    axios
      .get(`http://localhost:8080/association/find/${assoId}`)
      .then((response) => {
        const { id, name, def, desc, date } = response.data;

        setUpdateAsso({
          id: id,
          name: name,
          def: def,
          desc: desc,
          date: date,
          image: null,
        });

        setPlayImg(response.data.image);
      })
      .catch((error) => {
        // Gérez les erreurs ici

        console.error(error);
      });
  };

  const handleUpdateChange = (e) => {
    if (e.target.name === "image") {
      // Gestion du champ de fichier

      //changer playImg en null, pour ne plus afficher l'ancien image
      setPlayImg(null);

      setUpdateAsso({
        ...updateAsso,
        image: e.target.files[0], // Mettez à jour avec le fichier sélectionné
      });
    } else {
      const { name, value } = e.target;
      setUpdateAsso({
        ...updateAsso,
        [name]: value,
      });
    }
  };

  const handleUpdateSubmit = (e) => {
    /* navigate("/login"); */
    e.preventDefault();
    /* empêche par défaut l'actualisation du formulaire du navigateur */
    /* si il n'existe pas, le formulaire se reactualisera tantôt. on aura klk BUG */
    console.log("handle update submit ", updateAsso);

    const { id, name, def, desc, date, image } = updateAsso;

    const data = {
      id: id,
      name: name,
      def: def,
      desc: desc,
    };

    const formData = new FormData();

    const jsonData = JSON.stringify(data);

    formData.append(
      "association",
      jsonData
    ); /* chaine JSON # Objet JSON , on transforme jsonData en dehors de formData */
    formData.append(
      "date",
      date
    ); /* j'arrive pas a transformer en JSON le tpe DATE,mieux vaut l'envoyer comme objet clé - valeur */
    formData.append("image", image);

    axios
      .put("http://localhost:8080/association/update", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard/admin/associations");
      })
      .catch((error) => {
        // Gérez les erreurs ici
        console.log("Je suis dans ERROR");
        console.error(error);
      });
  };

  /* formData.append("id",updateAsso.id.toString())
    formData.append("name", updateAsso.name); // Champ de fichier
    formData.append("def", updateAsso.def);
    formData.append("desc", updateAsso.desc);
    formData.append("date", updateAsso.date.toString()); */

  const handleChange = (e) => {
    if (e.target.name === "image") {
      // Gestion du champ de fichier

      setAssociation({
        ...association,
        image: e.target.files[0], // Mettez à jour avec le fichier sélectionné
      });
    } else {
      const { name, value } = e.target;
      setAssociation({
        ...association,
        [name]: value,
      });
    }
  };

  const handleAddSubmit = (e) => {
    /* navigate("/login"); */

    e.preventDefault(); //empêchera l'acutualisation de la page

    const formData = new FormData();

    formData.append("name", association.name); // Champ de fichier
    formData.append("def", association.def);
    formData.append("desc", association.desc);
    formData.append("date", association.date.toString());
    formData.append("image", association.image);
    /*   formData.append("cin", association.cin.toString()); */ // Convertir en chaîne  .toString()

    axios
      .post("http://localhost:8080/association/save", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        // Traitez la réponse du serveur ici
        navigate("/dashboard/admin/associations");
        console.log(response.data);
      })
      .catch((error) => {
        // Gérez les erreurs ici
        alert("Je suis dans ERROR");
        console.error(error);
        setAssociation({
          name: "",
          def: "",
          desc: "",
          date: null,
          image: null,
        });
      });
  };

  const formulaire = () => {
    if (props.addForm == true) {
      return (
        <form>
          <div className="text-center">
            {association.image && (
              <img
                src={URL.createObjectURL(association.image)}
                alt="Image affichée"
                className="w-24 h-24 mx-auto rounded-full"
              />
            )}
          </div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic-1"
              fullWidth
              type="text"
              value={association.name}
              label="nom"
              variant="outlined"
              name="name"
              className="block w-[20rem] xl:w-[28rem] ms-4 "
              onChange={handleChange}
            />

            <TextField
              id="outlined-basic-2"
              name="def"
              fullWidth
              label="definition"
              type="text"
              variant="outlined"
              value={association.def}
              onChange={handleChange}
              className="block lg:inline-flex ms-[0.8rem] "
              placeholder="Placeholder"
              multiline
            />

            <TextField
              id="outlined-basic-3"
              name="desc"
              label="Description"
              fullWidth
              type="text"
              variant="outlined"
              value={association.desc}
              onChange={handleChange}
              className="block lg:inline-flex ms-[0.8rem] "
              placeholder="Placeholder"
              multiline
            />

            <TextField
              id="outlined-basic-3"
              name="date"
              label="Date"
              fullWidth
              type="date"
              variant="outlined"
              value={association.date}
              onChange={handleChange}
              className="block ms-[0.8rem] "
            />

            <div className="w-[20rem] xl:w-[28rem]  ms-4">
              <TextField
                id="outlined-basic-4"
                fullWidth
                name="image"
                type="file"
                variant="outlined"
                onChange={handleChange}
                required
              />
            </div>
          </Box>
          {/*  <ButtonAccount name="S'inscrire" /> */}
          <button
            onClick={handleAddSubmit}
            className="ring-2 bg-orange-500 opacity-75 text-white ring-white font-bold
        hover:text-slate-50 hover:opacity-100 px-4 text-xl focus:ring-offset-emerald-50 py-2 uppercase rounded-full"
          >
            Valider
          </button>
        </form>
      );
    } else if (props.updateForm == true) {
      return (
        <form onSubmit={handleUpdateSubmit}>
          <div className="text-center">
            {playImg == null ? (
              updateAsso.image && (
                <img
                  src={URL.createObjectURL(updateAsso.image)}
                  alt="Image affichée"
                  className="w-24 h-24 mx-auto rounded-full"
                />
              )
            ) : (
              <img
                src={`data:image/jpeg;base64,${playImg}`}
                alt="Image affichée"
                className="w-24 h-24 mx-auto rounded-full"
              />
            )}
          </div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic-1"
              fullWidth
              type="text"
              value={updateAsso.name}
              label="nom"
              variant="outlined"
              name="name"
              className="block w-[20rem] xl:w-[28rem] ms-4 "
              onChange={handleUpdateChange}
            />

            <TextField
              id="outlined-basic-2"
              name="def"
              fullWidth
              label="definition"
              type="text"
              variant="outlined"
              value={updateAsso.def}
              onChange={handleUpdateChange}
              className="block lg:inline-flex ms-[0.8rem] "
              placeholder="Placeholder"
              multiline
            />

            <TextField
              id="outlined-basic-3"
              name="desc"
              label="Description"
              fullWidth
              type="text"
              variant="outlined"
              value={updateAsso.desc}
              onChange={handleUpdateChange}
              className="block lg:inline-flex ms-[0.8rem] "
              placeholder="Placeholder"
              multiline
            />

            <TextField
              id="outlined-basic-3"
              name="date"
              label="Date"
              fullWidth
              type="date"
              variant="outlined"
              value={updateAsso.date}
              onChange={handleUpdateChange}
              className="block ms-[0.8rem] "
            />

            <div className="w-[20rem] xl:w-[28rem]  ms-4">
              <TextField
                id="outlined-basic-4"
                fullWidth
                name="image"
                type="file"
                label="image"
                variant="outlined"
                onChange={handleUpdateChange}
                required
              />
            </div>
          </Box>
          {/*  <ButtonAccount name="S'inscrire" /> */}
          <button
            type="submit"
            className="ring-2 bg-orange-500 opacity-75 text-white ring-white font-bold
              hover:text-slate-50 hover:opacity-100 px-4 text-xl focus:ring-offset-emerald-50 py-2 uppercase rounded-full"
          >
            Modifier
          </button>
        </form>
      );
    } else {
      <div> Veuillez vérifier vos informations de CODE.</div>;
    }
  };

  return (
    <div className="w-full pb-3 bg-slate-50 flex items-center justify-center">
      <div>
        {" "}
        <Pannel
          name={props.pannel}
          title="Ajouter une Association"
          text="Vive les associations."
        />
        <div className="text-center">
          <div className="flex mt-5 justify-center">{formulaire()}</div>
        </div>
      </div>
    </div>
  );
}
