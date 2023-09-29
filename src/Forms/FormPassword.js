import React, { useState, useEffect } from "react";
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
import { Navigate, useNavigate } from "react-router-dom";

function FormPassword() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id:null,
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();

    const target = e.target;
    const name = target.name;
    const value = target.value;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(`${name}  : `, value);
  };

  const handleSubmit = () => {
    console.log(user);
    alert("bonjour");
    navigate("/login");
  };

  return (
    <div className="flex mt-10 justify-center">
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
        
          <div className="lg:block text-start lg:text-center  border-red-100 lg:w-full">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Mot de passe
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
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
          </div>
        </Box>
        {/*  <ButtonAccount name="S'inscrire" /> */}
        <button
          type="submit"
          className="ring-2 bg-green-500 opacity-75 text-white ring-white font-bold
        hover:text-slate-50 hover:opacity-100 px-4 text-xl focus:ring-offset-emerald-50 py-2 uppercase rounded-full"
        >
          Valider
        </button>
      </form>
    </div>
  );
}

export default FormPassword;
