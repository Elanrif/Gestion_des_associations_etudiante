import React ,{useState,useContext} from 'react'
import Avatar from "@mui/material/Avatar";
import { AiFillLike,AiFillEyeInvisible, AiFillEye, AiFillDislike } from "react-icons/ai";
import { BsFillReplyAllFill } from "react-icons/bs";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import {IoMdArrowDropdown,IoMdArrowDropup} from "react-icons/io"
import { styled } from "@mui/material/styles";
import CommentReply from './CommentReply';
import { MdDelete } from "react-icons/md";
import { UserInfoContext } from '../../../AuthContext';
import { AssoContext } from '../../../Dashboard/Admin/Context';
import axios from 'axios';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CommentUD from './CommentUD';

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

function FormDialog(props) {

  const [open, setOpen] = React.useState(false);

  const [response,setResponse] = useState({content : ""})

  const { playDialog,comment ,userConnected} = props.data

   const { association, setPlay,play } = useContext(AssoContext);

  React.useEffect(() => {
  
    playDialog && setOpen(true)

  }, [playDialog])

 

  const handleClose = () => {
    setOpen(false);
  };

     const handleChange = (e) => {
       const { name, value } = e.target;

       /* quand on a un seul attribut on ne fait pas ...comment, */
       setResponse({
         ...comment,
         [name]: value,
       });
     };

     const handleSubmit = (e) => {
       e.preventDefault(); //pour ne pas actualiser auto la page.

        handleClose(); 
        
       axios
         .post(
           "/respond/save",
           response /* on peut pas faire ...comment , car c'est pas un tableau et donc pas iterable */,
           {
             params: {
               commentId: comment.id,
               userId: userConnected.id,
             },
           }
         )
         .then((response) => {

           setPlay(!play); //pour recharger l'association sur le composant Parent Association
           console.log("response : ", response.data);
           setResponse({ content: "" });

         })
         .catch((error) => {
           // Gérez les erreurs ici
           console.error(error);
         });
     };

     const BUTTON =
       response.content === "" ? (
         <Button>Envoyer</Button>/* on enlève le type="submit" et n'executra pas ce button dans le form */
       ) : (
         <Button type="submit">
           Envoyer
         </Button> 
       );

  return (
    <div>
        <Dialog open={open} onClose={handleClose}>
       <form onSubmit={handleSubmit}> {/* on met le form a l'interieur de Dialog et ajout de type="submit" au boutton et ça va marcher a executer handleSubmit */}
          <DialogTitle>Répondre</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez entrer votre réponse dans le champ ci-dessous...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="content"
              value={response.content}
              label="Commentaire"
              type="text"
              fullWidth
              onChange={handleChange}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            {BUTTON}
          </DialogActions>
       </form>
        </Dialog>
    </div>
  );
}

function CommentUser({comment}) {


    const [show, setShow] = useState(false)
    const [playDialog , setPlayDialog] = useState(false)

    const { userConnected ,userLoading} = useContext(UserInfoContext)
     const { association, setPlay,play } = useContext(AssoContext);

    const handleDeleteComment = (id)=>{

      /* on a ajouté le proxy pas nécessaire d'ajouter http://local.... */
       axios.delete(`/comment/delete/${id}`)
       .then((res)=>{
            //klk chose
            setPlay(!play) //pour relancer l'asso dans le parent Association.js dans le useEffect
       })
       .catch((err)=>{
         console.log("err : " , err)
       })

    }

    const handleUpdateComment = (id)=>{

      axios.update(`/comment/update/${id}`)
    }


    /* toujours vérifier nos props sur le return pour éviter des erreurs. */
  return (
    <>
      {comment && (
        <div className="my-6">
          <div>
            <div className="flex items-center space-x-2">
              {comment?.userInfo?.image ? (
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  src={`data:image/jpeg;base64,${comment?.userInfo?.image}`}
                />
              ) : (
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {comment.userInfo?.firstName.slice(0, 1)}
                </Avatar>
              )}

              <div className="text-lg">
                {comment.userInfo?.firstName} {comment.userInfo?.lastName}
                <p className="text-sm text-slate-500">
                  {comment.userInfo.email}
                </p>
              </div>
            </div>
            <div className="ms-14">
              {" "}
              <p className="my-3">{comment.content}</p>
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
                <BootstrapTooltip
                  title="Répondre"
                  onClick={() => setPlayDialog(!playDialog)}
                >
                  <div className="hover:cursor-pointer flex items-center space-x-2">
                    <BsFillReplyAllFill size="24px" className="text-blue-700" />
                  </div>
                  <FormDialog data={{ playDialog, comment, userConnected }} />{" "}
                  {/* on envoie plusieur et on va destructurer */}
                </BootstrapTooltip>
                <BootstrapTooltip>
                  <div className="hover:cursor-pointer flex items-center">
                    {userLoading &&
                      comment.userInfo.id === userConnected.id && (
                        <CommentUD data={{ comment, userConnected }} />
                      )}
                  </div>
                </BootstrapTooltip>
                <div onClick={() => setShow(!show)}>
                  <div className="hover:cursor-pointer flex items-center space-x-2">
                    {comment.responses.length > 0 && (
                      <>
                        {show ? (
                          <>
                            {" "}
                            <Tooltip
                              title={`${show ? "caché" : "afficher"}`}
                              arrow
                            >
                              <Button>
                                <IoMdArrowDropup
                                  size="24px"
                                  className="me-2 text-slate-700"
                                />
                                <div className="flex items-center space-x-2">
                                  <p className="text-blue-600">
                                    {" "}
                                    {comment.responses.length}{" "}
                                  </p>{" "}
                                  <p className="text-slate-500 lowercase">
                                    réponse{comment.responses.length > 1 && "s"}
                                  </p>{" "}
                                </div>
                              </Button>
                            </Tooltip>{" "}
                          </>
                        ) : (
                          <>
                            <Tooltip
                              title={`${show ? "caché" : "afficher"}`}
                              arrow
                            >
                              <Button>
                                <IoMdArrowDropdown
                                  size="24px"
                                  className="me-2 text-blue-700"
                                />
                                <div className="flex items-center space-x-2">
                                  <p className="text-blue-600">
                                    {" "}
                                    {comment.responses.length}{" "}
                                  </p>{" "}
                                  <p className="text-slate-500 lowercase">
                                    réponse{comment.responses.length > 1 && "s"}
                                  </p>{" "}
                                </div>
                              </Button>
                            </Tooltip>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
             
              </div>
            </div>
          </div>
          <div className={`${show ? "block" : "hidden"} duration-300`}>
            {/*  pour un tableau [] on verifie par length, responses existera toujours car dans Spring boot on l'
    initialise a new ArrayList<>() ; 
    juste on s'assure pour le cas ou il ne serait pas initialisé 5% de chance  */}
            {comment.responses?.length > 0 ? (
              comment.responses
                .sort((a, b) => b.id - a.id)
                .map((response, index) => {
                  return (
                    <React.Fragment>
                      <CommentReply data={{ response, comment }} />
                    </React.Fragment>
                  );
                })
            ) : (
              <React.Fragment>
                <div className="pt-5 ps-3 text-slate-600">
                  {" "}
                  Aucune réponse à ce commentaire.
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CommentUser
