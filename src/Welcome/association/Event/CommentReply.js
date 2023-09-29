import React ,{useState,useContext} from "react";
import Avatar from "@mui/material/Avatar";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { UserInfoContext } from "../../../AuthContext";
import { AssoContext } from "../../../Dashboard/Admin/Context";
import axios from "axios";
import CommentReplyUD from "./CommentReplyUD";

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

function CommentReply(props) {
  /* on vérifie que response est définie. puis après on fait response.userReply?.firstName
   ?. est une manière sécurisée d'accéder à la propriété firstName d'un objet response 
   qui pourrait être nul.il renvera UNDEFINED.

   ou bien methode ancienne response.userReply && response.userReply.firstName , le problème ici
   on repète 2fois response.userReply

   ?. (Operateur de navigation Optionnel) les 2 approches sont presque similaires mais ce dernier est une 
   innovation

   La différence ce que response.userReply && ou ? dans le cas ou on va retourner du JSX 
   par contre ?. juste pour açceder a la valeur
  */
 
     const { userConnected, userLoading } = useContext(UserInfoContext);
     const { setPlay, play } = useContext(AssoContext);

     const {response,comment } = props.data 

      
   return (
     <>
       {response ? (
         <div className="ms-16 my-4 bg-slate-100 rounded-xl p-3">
           <div>
             <div className="flex items-center space-x-2">
               {response?.userReply?.image ? (
                 <Avatar
                   sx={{ bgcolor: deepPurple[500] }}
                   src={`data:image/jpeg;base64,${response?.userReply?.image}`}
                 />
               ) : (
                 <Avatar sx={{ bgcolor: deepPurple[500] }}>
                   {response.userReply?.firstName.slice(0, 1)}
                 </Avatar>
               )}
               <div className="text-lg">
                 {response.userReply?.firstName} {response.userReply.lastName}{" "}
                 <p className="text-sm text-slate-500">
                   {response.userReply.email}
                 </p>
               </div>
             </div>
             <div className="ms-14">
               {" "}
               <p className="my-3">{response.content}</p>
               <div className="flex items-center space-x-5">
                 <BootstrapTooltip title="j'aime">
                   <div className="hover:cursor-pointer flex items-center space-x-2">
                     <AiFillLike size="24px" className="text-slate-400" />{" "}
                     <p>1</p>
                   </div>
                 </BootstrapTooltip>
                 <BootstrapTooltip title="je n'aime pas">
                   <div className="hover:cursor-pointer flex items-center space-x-2">
                     <AiFillDislike size="24px" className="text-slate-400" />
                     <p>3</p>
                   </div>
                 </BootstrapTooltip>
                 <BootstrapTooltip>
                   <div className="hover:cursor-pointer flex items-center">
                     {userLoading &&
                       response.userReply.id ===
                         userConnected.id /* personne repondu == personne connecté. */ && (
                         <CommentReplyUD
                           data={{ response, userConnected, comment }}
                         />
                       )}
                   </div>
                 </BootstrapTooltip>
               
               </div>
             </div>
           </div>
         </div>
       ) : (
         <div>
           <p> Aucune réponse n'est associé a ce commentaire !.</p>
         </div>
       )}
     </>
   );
}

export default CommentReply;
