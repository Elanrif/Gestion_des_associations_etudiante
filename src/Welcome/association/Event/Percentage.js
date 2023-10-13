import React,{useContext,useState,useEffect} from 'react'
import { AssoContext } from '../../../Dashboard/Admin/Context';
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";

function Percentage() {

  const { association } = useContext(AssoContext);
  const taille = association.benevoles.length

  const benevoles = (
    <div className="flex items-start space-x-2 pe-3">
      <AvatarGroup max={taille}>
        <Avatar alt="Remy Sharp" src="/image/users/president.jpg" />
        <Avatar alt="Travis Howard" src="/image/users/RRE.jpg" />
        <Avatar alt="Cindy Baker" src="/image/users/RL.jpg" />
        <Avatar alt="Agnes Walker" src="/image/users/RC.jpg" />
      </AvatarGroup>
      <p>
        {taille} <span className='text-md font-extralight'>bénevole(s)</span>
      </p>
    </div>
  );

  const comment = (
    <div className="flex items-center space-x-1">
      <Stack spacing={4} direction="row" sx={{ color: "action.active" }}>
        <Badge color="secondary" badgeContent={association.comments.length} showZero>
          <MarkUnreadChatAltIcon />
        </Badge>
      </Stack>
      <div className="text-3xl ps-2 text-slate-200 hover:text-slate-400 duration-300 font-black">
       commentaire(s)
      </div>
    </div>
  );

  return (
    <div className="my-4 flex justify-center">
      <div className="grid grid-cols-1 gap-y-2 lg:gap-y-0 lg:grid-cols-3">
        <div>
          <div className="text-3xl flex items-center space-x-2 text-slate-200 hover:text-slate-400 duration-300 font-black">
            {association.benevoles.length > 0
              ? benevoles
              : "Aucun Bénevole"}
          </div>
        </div>

        <div>
          <h1 className="text-3xl text-slate-200 hover:text-slate-400 duration-300 font-black">
            {association.events.length > 0
              ? `${association.events.length} Évènement(s)`
              : "Aucun Bénevole"}
          </h1>
        </div>
        <div>
          <div>
            {association.comments.length > 0
              ? comment
              : "Aucun Commentaire"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Percentage
