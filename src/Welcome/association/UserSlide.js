import React,{useState} from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BsFacebook } from "react-icons/bs";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

function UserSlide(props) {
  const [bureau, setBureau] = useState(props.avatar);

  /* parfois c'est mieux de mettre le props dans un State .
   * sauf si le props n'est pas dynamique(on parle des function)
   *
   *
   * */

  const {avatar} = props

  return (
    <div className="p-3 border mx-4 border-slate-100 rounded-xl bg-orange-50 ">
      <div>
        <Avatar
          alt="Remy Sharp"
          src={`data:image/jpeg;base64,${
            avatar.image ? avatar.image : "Not image"
          }`}
          sx={{ width: 150, height: 150 }}
          className="mx-auto"
        />
        <div className="text-center mt-5">
          <h1 className="font-bold text-xl">{avatar.firstName}</h1>
          <p className="text-slate-600 italic">{avatar.status}</p>
        </div>
      </div>

      <aside className="max-w-[18rem] mx-auto mt-3 text-slate-800 text-center">
        {avatar.desc}{" "}
      </aside>
    </div>
  );
}

export default UserSlide;
