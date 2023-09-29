import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import PanneauE from "./PanneauE";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Président",
  "Vice-Président",
  "Sécretaire",
  "Trésorier",
  "Responsable des Événements",
  "Responsable des Relations Publiques",
  "Responsable de la Formation",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FormEvent(props) {
  
  const [associations, setAssociations] = useState([]);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  useEffect(() => {
    displAssociations();
  }, []);

  const displAssociations = () => {
    axios
      .get("http://localhost:8080/association/find/all")
      .then((res) => {
        setAssociations(res.data);
      })
      .catch((err) => {
        console.log("err : ", err);
      });
  };

  const handleChangeMUI = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const navigate = useNavigate();

  const { eventId } = useParams();

  const [event, setEvent] = useState({
    id: null,
    type: "",
    descp: "",
    date: null,
    associationId: null,
  });

  /* on sauvegarde l'image ici. */
  const [playImg, setPlayImg] = useState(null);

  useEffect(() => {
    props.updateForm && upload();
  }, []);

  /* si c'est l'admin, je passe l'id dans l'URL sinon JE PRENDS LES DONNÉES PAR LA PERSONNE CONNECTÉ */
  const upload = () => {
    /* sur Bureau @JsonIgnore association, donc on va recuperer l'asso avec une autre méthode... */
    axios
      .get(`http://localhost:8080/evenement/find/${eventId}`)
      .then((res) => {

        setEvent({
          id: res.data.id,
          type: res.data.type,
          descp: res.data.descp,
          date: res.data.date,
          image: null,
        });

        setPlayImg(res.data.image);

        /* En même temps je recupère son Association : en ajoutant l'id du event de Bureau dans l'URL */
        axios
          .get(`http://localhost:8080/evenement/${res.data.id}/find/association`)
          .then((response) => {
            setEvent((prev) => ({
              ...prev,
              associationId: response.data.id,
            }));
          })
          .catch((error) => {
            alert("error : ", error);
          });
      })
      .catch((error) => {
        // Gérez les erreurs ici

        console.error(error);
      });

    /*c'etait l'erreur: setPlayImg("/image/test"); */
  };

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;

    if (name === "image") {
      // Gestion du champ de fichier

      //changer playImg en null, pour ne plus afficher l'ancien image et afficher l'image sélectionner
      props.updateForm && setPlayImg(null);

      setEvent({
        ...event,
        image: target.files[0], // Mettez à jour avec le fichier sélectionné
      });
    } else {
      console.log(name, ": ", value);

      setEvent({
        ...event,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //pour ne pas actualiser auto la page.

    const formData = new FormData();

    const { id, type, descp, image, date, associationId } = event;

    const dataSet = {
      id: id,
      type: type,
      descp: descp
    };

    const data = JSON.stringify(dataSet);

    formData.append("evenement", data); // Champ de fichier
    formData.append("date", date.toString()); // Champ de fichier
    formData.append("image", image);
    /*   formData.append("apogee", user.apogee.toString()); */ // Convertir en chaîne  .toString()

    /* association , contient l'id de l'association */
    if (props.addForm) {
      axios
        .post(`http://localhost:8080/evenement/save/${associationId}`, formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((response) => {
          // Traitez la réponse du serveur ici

          setEvent({
            id: null,
            type: "",
            descp: "",
            date: null,
            associationId: null,
          });

          navigate("/dashboard/admin/events");
        })
        .catch((error) => {
          // Gérez les erreurs ici
          alert("Je suis dans ERROR create ");
          console.error(error);
        });
    } else if (props.updateForm) {
      axios
        .put(`http://localhost:8080/evenement/update/${associationId}`, formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((response) => {
          // Traitez la réponse du serveur ici

          setEvent({
            id: null,
            type: "",
            descp: "",
            date: null,
            associationId: null,
          });

          navigate("/dashboard/admin/events");
        })
        .catch((error) => {
          // Gérez les erreurs ici
          alert("Je suis dans ERROR update ");
          console.error(error);
        });
    } else {
      alert(" Quelque chose c'est mal produit.");
    }
  };

  const { type, descp, date, associationId } = event;

  const btn =
    type === "" ||
    descp === "" ||
    date === null ||
    associationId === null ? (
      <button
        className={`mt-3 ring-2 bg-blue-300
       } opacity-75 text-white ring-white font-bold
           hover:text-slate-50 hover:opacity-75 px-4 text-lg focus:ring-offset-emerald-50 py-2 uppercase    rounded-full hover:cursor-not-allowed`}
        disabled
      >
        valider
      </button>
    ) : (
      <button
        type="submit"
        className={`mt-3 ring-2 bg-blue-500
       opacity-75 text-white ring-white font-bold
           hover:text-slate-50 hover:opacity-100 px-4 text-lg focus:ring-offset-emerald-50 py-2 uppercase rounded-full`}
      >
        valider
      </button>
    );

  return (
    <div className="w-full pb-3 bg-slate-50 flex items-center justify-center">
      <div>
        {" "}
        <PanneauE name={props.pannel} />
        <div className="text-center">
          <div className="flex mt-5 justify-center">
            <form onSubmit={handleSubmit}>
              {event && (
                <>
                  <div className="text-center">
                    {playImg === null ? (
                      event.image && (
                        <img
                          src={URL.createObjectURL(event.image)}
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
                      id="outlined-basic-2"
                      name="type"
                      label="Type"
                      type="text"
                      variant="outlined"
                      value={event.type}
                      onChange={handleChange}
                      className="ms-4"
                      multiline
                    />

                    <TextField
                      id="outlined-basic-3"
                      name="descp"
                      label="Description"
                      type="text"
                      variant="outlined"
                      value={event.descp}
                      onChange={handleChange}
                      multiline
                    />
                    <div className="w-[20rem] xl:w-[28rem]  ms-4">
                      <TextField
                        id="outlined-basic-3"
                        name="date"
                        label="Date"
                        fullWidth
                        type="date"
                        variant="outlined"
                        value={event.date}
                        onChange={handleChange}
                        className="block"
                      />
                    </div>

                    <div className="w-[28rem] ms-4 border">
                      <FormControl fullwidth className="w-full">
                        <InputLabel id="demo-multiple-association-label">
                          Association
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-association-label"
                          id="demo-multiple-association" /* NB: toujours le name et state.attribut name et attribut doivent avoir le même nom */
                          value={
                            event.associationId
                          } /*pour un SELECT , on a 2 value ça et ce qui est sur OPTION : ici option est MenuItem. cette dernier value modifiera automatiquement le 1er value */
                          name="associationId" /* j'avais oublier de changer le name */
                          label="Association"
                          onChange={handleChange}
                          input={<OutlinedInput label="Association" />}
                          MenuProps={MenuProps}
                        >
                          {associations &&
                            associations.map((item, index) => (
                              <MenuItem
                                key={index}
                                value={
                                  item.id
                                } /* cette valeur sera mis dans le State. event.association : item.id */
                                style={getStyles(item, personName, theme)}
                              >
                                {item.id}. {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="w-[20rem] xl:w-[28rem]  ms-4">
                      <TextField
                        id="outlined-basic-4"
                        fullWidth
                        name="image"
                        type="file"
                        label="image"
                        variant="outlined"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Box>

                  {btn}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

