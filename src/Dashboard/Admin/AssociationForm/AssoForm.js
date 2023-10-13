import React ,{useState,useEffect} from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import Pannel from '../../../Forms/Pannel';
import axios from 'axios';

function AssoForm(props) {

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

   const [playImg, setPlayImg] = useState(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    props.updateForm && display();
  }, []);

  const display = () => {
    axios
      .get(`http://localhost:8080/association/find/${assoId}`)
      .then((response) => {
        const { id, name, def, desc, date } = response.data;

        setAssociation({
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

 

    const handleChange = (e) => {

      if (e.target.name === "image") {
        // Gestion du champ de fichier

        //changer playImg en null en cas de UPDATE, pour ne plus afficher l'ancien image de la BDD
        //je le fais seulement en UPDATE 
        props.updateForm && setPlayImg(null);

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


  const handleSubmit = (e) => {
    /* navigate("/login"); */
    e.preventDefault();

    console.log("SOCIETY : " , association)
    /* empêche par défaut l'actualisation du formulaire du navigateur */
    /* si il n'existe pas, le formulaire se reactualisera tantôt. on aura klk BUG */
   
    const { id, name, def, desc, date, image } = association;

    const data = {
      id: id,
      name: name,
      def: def,
      desc: desc,
    };

    const formData = new FormData();

    const jsonData = JSON.stringify(data);

    formData.append(
      "association",jsonData
    ); /* chaine JSON # Objet JSON , on transforme jsonData en dehors de formData */
    formData.append(
      "date", date.toString()
    ); /* j'arrive pas a transformer en JSON le tpe DATE, aussi sur multipart/form-data on evoi que des String */

    formData.append("image", image);

    if (props.addForm) {
      axios
        .post("/association/save", formData, {
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
    } else if (props.updateForm) {
      axios
        .put("/association/update", formData, {
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
    } else {
      alert(" Error : veuillez vérifiez vos données !");
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
          <div className="flex mt-5 justify-center">
            <form onSubmit={handleSubmit}>
              <div className="text-center">
                {playImg == null ? (
                  association.image && ( /* on prendra l'image qui sera mis dans le formulaire */
                    <img
                      src={URL.createObjectURL(association.image)}
                      alt="Image affichée"
                      className="w-24 h-24 mx-auto rounded-full"
                    />
                  )
                ) : ( /* sinon on affiche l'image de la BDD , si on modifie on doit mettre playImg à null */
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
                className="ring-2 bg-orange-500 opacity-75 text-white ring-white font-bold
        hover:text-slate-50 hover:opacity-100 px-4 text-xl focus:ring-offset-emerald-50 py-2 uppercase rounded-full"
              >
                Valider
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssoForm
