import React, { useState,useContext, useEffect } from "react";
import ButtonAccount from "./ButtonAccount";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import { UserContext } from "./ContextData"; /* pour utiliser le contexte , on va l'importer  */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserInfoContext } from "../AuthContext";

function FormUpdate() {

  
  const { userConnected, setUserConnected } = useContext(UserInfoContext);
  

  const navigate = useNavigate();

  const { userId } = useParams();

  const [user, setUser] = useState({
    id: null,
    firstName: "",
    lastName: "",
    apogee: "",
    password: "",
    image: null,
    checkPassword: "",
  });

  const [playImg, setPlayImg] = useState(null);


  useEffect(() => {
    upload();
  }, []);


  const person = useContext(UserContext);

  /* si c'est l'admin, je passe l'id dans l'URL sinon JE PRENDS LES DONNÉES PAR LA PERSONNE CONNECTÉ */
  const upload = () => {
    person === "admin"
      ? axios
          .get(`http://localhost:8080/user/find/${userId}`)
          .then((response) => {
            const { id, firstName, password, lastName, email, apogee } =
              response.data; /* y'avait ça : , image */

            setUser({
              id: id,
              apogee: apogee,
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              checkPassword: password,
              image: null,
            });

            setPlayImg(response.data.image);
          })
          .catch((error) => {
            // Gérez les erreurs ici

            console.error(error);
          })
      : userConnected &&
        setUser({
          id: userConnected.id,
          apogee: userConnected.apogee,
          firstName: userConnected.firstName,
          lastName: userConnected.lastName,
          email: userConnected.email,
          password: userConnected.password,
          checkPassword: userConnected.password,
          image: null,
        });
    /* setPlayImg("/image/test"); */
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
       
   /*  
    const target = e.target;
    const name = target.name;
    const value = target.value; 
    */

    if (e.target.name === "image") {
      // Gestion du champ de fichier

      //changer playImg en null en cas de UPDATE, pour ne plus afficher l'ancien image de la BDD
      //je le fais seulement en UPDATE
      setPlayImg(null);

      setUser({
        ...user,
        image: e.target.files[0], // Mettez à jour avec le fichier sélectionné
      });
    } else {
      const {name,value} = e.target
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault(); //pour ne pas actualiser auto la page.
   
    const formData = new FormData();

    const { id, firstName, lastName, password,image, email, apogee } = user;

    const dataa = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      apogee: apogee,
    };

    const data = JSON.stringify(dataa);

    formData.append("user", data); // Champ de fichier
    
    formData.append("image", image);
    
   // user.image === null? formData.append("image", null) : formData.append("image", image);
 
   
   /* le problème c'etait dans lÚRL , j'avais utiliser : post.  http://loca..../user/saveWithImg */
    axios
      .put("/user/updateWithImg", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        // Traitez la réponse du serveur ici
        setUser({
          id: null,
          firstName: "",
          lastName: "",
          password: "",
          email: "",
          apogee: "",
        });

        setUserConnected(response.data) //modifier dans le state parent l'User connecté 
       person === "admin"
         ? navigate("/dashboard/admin/users")
         : navigate("/dashboard/user/profile");
      })
      .catch((error) => {
        // Gérez les erreurs ici 
        alert("Je suis dans ERROR");
        console.error(error);
      });
  };


  const { firstName, lastName, email, apogee,checkPassword, password } = user;

  const btn =
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    apogee === "" ||
    password === "" ||
    checkPassword === "" ||
    user.password !== user.checkPassword ? (
      <button
        className={`ring-2 ${
          person === "admin" ? "bg-blue-300" : "bg-green-300 "
        } opacity-75 text-white ring-white font-bold
           hover:text-slate-50 hover:opacity-75 px-4 text-lg focus:ring-offset-emerald-50 py-2 uppercase    rounded-full hover:cursor-not-allowed`}
        disabled
      >
        Modifier
      </button>
    ) : (
      <button
        type="submit"
        className={`ring-2 ${
          person === "admin" ? "bg-blue-500" : "bg-green-500 "
        } opacity-75 text-white ring-white font-bold
           hover:text-slate-50 hover:opacity-100 px-4 text-lg focus:ring-offset-emerald-50 py-2 uppercase rounded-full`}
      >
        Modifier
      </button>
    );

    /* si le mot de passe n'est pas éronnée */
    const dispalyMdp =
      user.password !== user.checkPassword ? (
        <>
          {" "}
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel error htmlFor="outlined-adornment-password">
              Mot de passe
            </InputLabel>
            <OutlinedInput
              error
              id="outlined-adornment-password"
              value={user.password}
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel error htmlFor="adornment-password">confirmer</InputLabel>
            <OutlinedInput
              error
              id="adornment-password"
              value={user.checkPassword}
              name="checkPassword"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="confirmer_mdt"
              onChange={handleChange}
            />
          </FormControl>
        </>
      ) : (
        <>
          {" "}
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Mot de passe
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={user.password}
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="adornment-password">confirmer</InputLabel>
            <OutlinedInput
              id="adornment-password"
              value={user.checkPassword}
              name="checkPassword"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="confirmer_mdt"
              onChange={handleChange}
            />
          </FormControl>
        </>
      );


  return (
    <div className="flex mt-5 justify-center">
      <form onSubmit={handleSubmit}>
        {user && (
          <>
            <div className="text-center">
              {playImg === null ? (
                user.image && (
                  <img
                    src={URL.createObjectURL(user.image)}
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
                value={user.apogee}
                label="Num apogeé"
                variant="outlined"
                name="apogee"
                className="block w-[28rem] ms-4 "
                onChange={handleChange}
              />

              <TextField
                id="outlined-basic-2"
                name="firstName"
                label="Nom"
                type="text"
                variant="outlined"
                value={user.firstName}
                onChange={handleChange}
              />

              <TextField
                id="outlined-basic-3"
                name="lastName"
                label="Prenom"
                type="text"
                variant="outlined"
                value={user.lastName}
                onChange={handleChange}
              />

              <div className="w-[28rem] ms-4 border">
                <TextField
                  id="outlined-basic-4"
                  fullWidth
                  name="email"
                  type="email"
                  label="E-mail"
                  variant="outlined"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex w-full">
              
                {dispalyMdp}

              </div>
              <div className="w-[20rem] xl:w-[28rem]  ms-4">
                <TextField
                  id="outlined-basic-5"
                  fullWidth
                  name="image"
                  type="file"
                  label="Image"
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
  );
}

export default FormUpdate;
