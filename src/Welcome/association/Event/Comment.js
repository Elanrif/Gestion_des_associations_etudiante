import React,{useState,useEffect,useContext} from 'react'
import CommentUser from './CommentUser'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { AssoContext } from '../../../Dashboard/Admin/Context';
import { UserInfoContext } from '../../../AuthContext';
import axios from 'axios';

function Comment() {

  
  const { userConnected,userLoading, setUserConnected } = useContext(UserInfoContext);
  
  const {association,setPlay,play} = useContext(AssoContext)

  const {comments } = association 
  

  const [comment,setComment] = useState({content : ""}) 

  const plays = userLoading ? false : true 

  useEffect(() => {
    console.log("btn", plays);
  }, [plays]);

   const handleChange = (e) => {
    
       const { name, value } = e.target;

       /* quand on a un seul attribut on ne fait pas ...comment, */
       setComment({
         ...comment,
         [name]: value,
       });

       console.log(name , " : " , value)
   };

   const handleSubmit = (e) => {

     e.preventDefault(); //pour ne pas actualiser auto la page.
     
     axios
       .post("/comment/save", 
        comment, /* on peut pas faire ...comment , car c'est pas un tableau et donc pas iterable */
       {
        params:{
          assoId : association.id ,
          userId : userConnected.id
        }
       })
       .then((response) => {
         
          setPlay(!play) //pour recharger l'association sur le composant Parent Association
          console.log("comment : ", response.data)
          setComment({content : ""})
       })
       .catch((error) => {
         // Gérez les erreurs ici
         console.log("Je suis dans ERROR");
         console.error(error);
       });
   };

   const sendForm =
     comment.content === "" || userLoading === false ? (
       <input
         type="submit"
         className={`hover:bg-slate-100  p-3 rounded-xl hover:cursor-not-allowed
         `}
         value="Ajouter un commentaire"
         disabled
       />
     ) : (
       <input
         type="submit"
         className={`hover:bg-slate-100  p-3 rounded-xl hover:cursor-pointer
         `}
         value="Ajouter un commentaire"
         
       />
     );

     

  return (
    <div className="lg:max-w-[60rem] ms-16">
      {/* toujours on vérifie nos props ou useContext ou state afin d'éviter les erreurs. */}
      <form className="mb-3" onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "flex-end", mr: 1, my: 0.5 }}>
          {userLoading /*on a un user connecté */ ? (
            userConnected.image ? (
              <Avatar
                alt="Remy Sharp"
                src={`data:image/jpeg;base64,${userConnected.image}`}
              />
            ) : (
              /* il n'a pas d'image */
              <Avatar sx={{ bgcolor: deepPurple[500] }} className="me-3">
                {userConnected.firstName?.slice(0, 1)}{" "}
                {userConnected.lastName?.slice(0, 1)}
              </Avatar>
            )
          ) : (
            <Avatar sx={{ bgcolor: deepPurple[500] }} className="me-3">
              D
            </Avatar>
          )}
          {/*   <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
          <TextField
            sx={{ maringLeft: "3" }}
            fullWidth
            type="text"
            name="content"
            id="comment"
            label="Ajouter un commentaire"
            variant="standard"
            value={comment.content}
            onChange={handleChange}
          />
        </Box>
        <div className="mt-3 flex justify-end">
          <input
            type="reset"
            className={`hover:bg-slate-100 hover:text-red-400 duration-300 p-3 rounded-xl ${
              plays && "hover:cursor-not-allowed"
            }`}
            value="Annuler"
            onClick={()=> setComment((prev)=>({...prev, content : ""}))}
            disabled={plays}
          />

          {sendForm}
        </div>
      </form>

      {comments?.length > 0 ? (
        <>
          {comments
            .sort((a, b) => b.id - a.id)
            .map((item, index) => (
              <React.Fragment key={index}>
                <CommentUser comment={item} />
              </React.Fragment>
            ))}
        </>
      ) : (
        <div>
          <div className="pt-5 mb-4 text-2xl font-bold ps-3 text-slate-300">
            {" "}
            Pas commentaire pour l'association.
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment
