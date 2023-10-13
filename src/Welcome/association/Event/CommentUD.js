import React,{useState,useContext} from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import {AiOutlineDelete} from "react-icons/ai"
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
import { AssoContext } from "../../../Dashboard/Admin/Context";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";


function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const { association, setPlay, play } = useContext(AssoContext);
  const { comment, userConnected, playDialog, setPlayDialog } = props.data;

  /* tout est bien, mais lorsque je clique directement une 2éme fois (très bisarre car tout la logique est la et marche quand on modifie il affiche la modification pourtant) pour modifier le comment je ne le vois pas solution voir dans handleSubmit */

  /*SOLUTION peut être car j'ai pas utilisé un context qui est > a props car on a directement la valeur
  en + mon context rechargera Association.js et me fournira le bon comment. */
  const [coment, setComment] = useState({
     id : comment.id,
     content: comment.content
     });

     //apres modification le {comment}

  React.useEffect(() => {
    playDialog && setOpen(true);
  }, [playDialog]); 

  const handleClose = () => { /* on remet playDialog a false quand on ferme le Dialog */
    setOpen(false);
    setPlayDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    /* quand on a un seul attribut on ne fait pas ...comment, */
    setComment({
      ...coment,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //pour ne pas actualiser auto la page.

    handleClose();

    axios
      .put(
        "/comment/update",
        coment /* on peut pas faire ...comment , car c'est pas un tableau et donc pas iterable */,
       /*  {
          params: {
            assoId: association.id,
            userId: userConnected.id,
          },
        } */
      )
      .then((res) => {

        setPlay(!play); //pour recharger l'association sur le composant Parent Association
        setComment({
          id : res.data.id,
          content: res.data.content });
        setPlayDialog(false) /* on remet a false le playDialog lorsque on a envoyé car on veut un changement de valeur pour réexecuté le useFect */
        
        setComment(res.data) /* on s'assure a chaque fois qu'on envoie on stock dans le state coment le commentaire ; a cause des problèmes que j'ai eu j'ai fait cette solution */
    })
      .catch((error) => {
        // Gérez les erreurs ici
        console.error(error);
      });
  };

  const BUTTON =
    coment.content === "" ? (
      <Button>
        Modifier
      </Button> /* on enlève le type="submit" et n'executra pas ce button dans le form */
    ) : (
      <Button type="submit">Modifier</Button>
    );

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* on met le form a l'interieur de Dialog et ajout de type="submit" au boutton et ça va marcher a executer handleSubmit */}
          <DialogTitle>Modifier</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modifier votre commentaire  dans le champ ci-dessous...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="content"
              value={coment.content}
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


export default function CommentUD(props) {

  const { association, setPlay, play } = useContext(AssoContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [playDialog, setPlayDialog] = useState(null)

  const { comment, userConnected } = props.data

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseItem = () => {
    setAnchorEl(null);
  };

  const handleDelete = (comment)=>{

    handleCloseItem() 
    axios.delete(`/comment/delete/${comment.id}`)
    .then((res)=>{
        
      //do something 
      console.log("delete : " , res.data)
      setPlay(!play)

    }).catch((err)=>{
      console.log("err : " , err)
    })

  }

 

  return (
    <div>
      <button onClick={handleClick}>
        <PiDotsThreeVerticalBold size="24px" />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseItem}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => {handleCloseItem();setPlayDialog(true); }}> {/* chaque clic je veux afficher le Dialog donc true */}
          <FaPencil /> &nbsp;&nbsp; <span>Modifier</span>
        </MenuItem>
        <MenuItem onClick={()=>handleDelete(comment)}>
          <AiOutlineDelete />
          &nbsp;&nbsp;<span>Supprimer</span>
        </MenuItem>
      </Menu>
      <FormDialog
        data={{ comment, userConnected, playDialog ,setPlayDialog}}
      />
    </div>
  );
}
