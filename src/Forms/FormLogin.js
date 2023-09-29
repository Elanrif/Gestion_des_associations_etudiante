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
import { Navigate,useNavigate } from 'react-router-dom';
import { CheckUserConnected, UserSetConnected } from '../AuthContext';
import axios from "axios"
import AlertLogin from './AlertLogin';
import { UserInfoContext } from '../AuthContext';

export const AUTH = "auth";

function FormLogin() {
  const [open, setOpen] = React.useState(0);

  const { setUserInfo, setLoading } = useContext(UserInfoContext);
  /* Register.js et Login.js ont passée
   un autre UserInfoContext.Provider imbriqué avec une valeur et ce useContext  prendra ces valeurs. donc useContext dans un composant
   prends les valeurs du UserInfoContext.Provider le plus proche dans l'arbre depuis ce composant */

  /* DOC : https://react.dev/reference/react/useContext ,
  REUTRN : useContext returns the context value for the calling component. It is determined as the value passed to the closest SomeContext.Provider above the calling component in the tree. If there is no such provider, then the returned value will be the defaultValue you have passed to createContext for that context. The returned value is always up-to-date. React automatically re-renders components that read some context if it changes. */

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "elanrif@gmail.com",
    password: "123456",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/user/login", user)
      .then((res) => {
      
        /* je modifie depuis App.js le state userInfo et mettre loading a true. pour confirmé que il est connecté
         * comme ça dans App.js on re-rentre dans le useEffect
         */
        setUserInfo(res.data);
        setLoading(true);

        //pour que dans App.js si on actualise la page le state sera initialisé par la session.
        sessionStorage.setItem("auth", JSON.stringify(res.data));

        navigate("/dashboard/user");
      })
      .catch((err) => {
        console.log("err Login: ", err);
        //modifier le state open a true.
        setOpen((prev) => prev + 1);

        setUser({
          email: "",
          password: "",
        });

        //AFFICHE L'ERREUR SUR LE NAVIGATEUR .

        // Promise.reject(err) ;
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { email, password } = user;

  const botton =
    email === "" || password === "" ? (
      <button
        className="ring-2 bg-green-300 opacity-75 text-white ring-white font-semibold
        hover:text-slate-50 hover:cursor-not-allowed hover:opacity-100 px-4 text-lg focus:ring-offset-emerald-50 py-2 uppercase rounded-full"
        disabled
      >
        Se connecter
      </button>
    ) : (
      <button
        className="ring-2 bg-green-500 opacity-75 text-white ring-white font-semibold
        hover:text-slate-50 hover:opacity-100 px-4 text-lg focus:ring-offset-emerald-50 py-2 uppercase rounded-full"
      >
        Se connecter
      </button>
    );

  return (
    <>
      <AlertLogin alert={open} />
      <div className="flex mt-[2rem] justify-center">
        <form onSubmit={handleSubmit}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic-1"
              fullWidth
              type="email"
              label="email"
              variant="outlined"
              className="block"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />

            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              className="mt-12"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Mot de passe
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                value={user.password}
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
                label="Mot de passe"
                className="mb-3"
                onChange={handleChange}
              />
            </FormControl>
          </Box>
          {botton}
        </form>
      </div>
    </>
  );
}

export default FormLogin
