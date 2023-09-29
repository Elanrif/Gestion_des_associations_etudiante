import React,{useState,useEffect,useContext} from 'react'
import ButtonAccount from './ButtonAccount'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useNavigate } from 'react-router-dom';
import axios from "axios"
import { UserInfoContext } from '../AuthContext';

function FormRegister() {

  const { setUserInfo, setLoading } = useContext(UserInfoContext);

  const navigate = useNavigate() ; 

    const [user, setUser] = useState({
      cin : null,
      firstName:"",
      lastName:"",
      password: "",
      checkPassword : "",
      email: ""
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleChange = (e)=>{


           const { name, value } = e.target;

           setUser({
             ...user,
             [name]: value,
           });
       
    }


    const handleSubmit = (e)=>{
         
         e.preventDefault() 

         axios
           .post("/user/register",       
            user 
           ,{
             "Content-Type": "application/json",
           })
           .then((response) => {
           
             //on change le state dans App.js par les infos de User connecté. et mettre a true loading de App.js a cause de useEffect de App.js
             setUserInfo(response.data);
             setLoading(true);

             //pour que dans App.js si on actualise la page le state sera initialisé par la session.
             sessionStorage.setItem("auth", JSON.stringify(response.data));
              navigate("/dashboard/user");
           })
           .catch((error) => {
             // Gérez les erreurs ici
             console.error(error);
           });

    }

    const { firstName, lastName, email, apogee, checkPassword, password } = user;

    const btn =
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      apogee === "" ||
      password === "" ||
      checkPassword === "" ||
      user.password !== user.checkPassword ? (
        <button
          className={`ring-2 bg-green-300 opacity-75 text-white ring-white font-bold
           hover:text-slate-50 hover:opacity-75 px-4 text-lg focus:ring-offset-emerald-50 py-2 uppercase    rounded-full hover:cursor-not-allowed`}
          disabled
        >
          Enregister
        </button>
      ) : (
        <button
          type="submit"
          className={`ring-2 bg-green-500 opacity-75 text-white ring-white font-bold
           hover:text-slate-50 hover:opacity-100 px-4 text-lg focus:ring-offset-emerald-50 py-2 uppercase rounded-full`}
        >
          Enregistrer
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
            <InputLabel error htmlFor="adornment-password">
              confirmer
            </InputLabel>
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

              <div className="flex w-full">{dispalyMdp}</div>
          
            </Box>

            {btn}
          </>
        )}
      </form>
    </div>
  );
}

export default FormRegister
