import React from 'react'
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BsFacebook} from "react-icons/bs"
import { AiFillInstagram, AiFillLinkedin,AiOutlineWhatsApp } from "react-icons/ai";
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

export default function Bureau(props) {

  /* const {status} = props.avatar.bureau

  const def = (status) => {
    switch (status) {
      case "Président":
        return (
          <>
            Le président est le responsable principal de l'association. Il/Elle
            est chargé(e) de diriger les réunions et de prendre des décisions
            importantes en collaboration avec les autres membres du bureau.
          </>
        );
      case "Vice-Président":
        return (
          <>
            Le vice-président assiste le président dans ses responsabilités et
            le remplace en son absence. Il/Elle est également souvent
            responsable de tâches spécifiques assignées par le président.
          </>
        );
      case "Sécretaire":
        return (
          <>
            Le secrétaire est chargé(e) de la documentation et de la
            communication au sein de l'association. Il/Elle prend des notes lors
            des réunions et s'assure que les membres sont informés des activités
            à venir.
          </>
        );
      default:
        return <>Définition non disponible pour ce statut.</>;
    }
  };
 */


  const {bureau} = props.avatar 


  return (
    <div>
      <div>
        <Avatar
          alt="Remy Sharp"
          src={
            bureau && bureau.image && `data:image/jpeg;base64,${bureau.image}`
          }
          sx={{ width: 200, height: 200 }}
          className="mx-auto"
        />
        <div className="text-center mt-5">
          <h1 className="font-bold text-xl">{bureau && bureau.firstName}</h1>
          <p className="text-slate-600 italic">{bureau && bureau.status}</p>
        </div>
      </div>

               {/* ils prennent la même hauteur pour ne pas avoir du débordement  */}
      <div>
        <aside className="max-w-[18rem] h-[6rem]  mt-3 pb-2  text-slate-600 text-center">
          {bureau && bureau.desc/* .slice(0,190) */}
        </aside>
      </div>

      <div>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <BootstrapTooltip title="Facebook">
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              sx={{ fontSize: "0.5rem" }}
            >
              <BsFacebook size="2rem" />
            </Fab>
          </BootstrapTooltip>

          <BootstrapTooltip title="Instagram">
            <Fab size="small" className="text-slate-300" aria-label="edit">
              <AiFillInstagram size="2rem" className="text-[#E4405F]" />
            </Fab>
          </BootstrapTooltip>

          <BootstrapTooltip title="Whatsapp" sx={{ size: 3 }}>
            <Fab size="small" aria-label="extended" className="bg-green-300">
              <AiOutlineWhatsApp size="2rem" className="text-slate-700" />
            </Fab>
          </BootstrapTooltip>

          <BootstrapTooltip title="LinkedIn">
            <Fab size="small" aria-label="like">
              <AiFillLinkedin size="2rem" className="text-blue-700" />
            </Fab>
          </BootstrapTooltip>
        </Box>
      </div>
    </div>
  );
}

