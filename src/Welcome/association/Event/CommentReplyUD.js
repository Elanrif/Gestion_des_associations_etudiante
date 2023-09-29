import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
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

  const {setPlay, play } = useContext(AssoContext);
  const { comment,response, userConnected, playDialog } = props.data;

  const [respond, setResponse] = useState({ /* pour update on doit avoir l'id comme ça spring boot modifie sinon il va créer une réponse */
    id : response.id ,
    content: response.content });

  React.useEffect(() => {
    playDialog && setOpen(true);
  }, [playDialog]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    /* quand on a un seul attribut on ne fait pas ...comment, */
    setResponse({
      ...respond,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //pour ne pas actualiser auto la page.

    handleClose();

    axios
      .put(
        "/respond/update",
        respond /* on peut pas faire ...comment , car c'est pas un tableau et donc pas iterable */,
        {
          params: {
            commentId: comment.id,
            userId: userConnected.id,
          },
        }
      )
      .then((res) => {
        setPlay(!play); //pour recharger l'association sur le composant Parent Association
        console.log("respond : ", res.data);
        setResponse({ 
          id : res.data.id,
          content: res.data.content });/* je modifie tjrs le state avec la data correspondante */
      })
      .catch((error) => {
        // Gérez les erreurs ici
        console.error(error);
      });
  };

  const BUTTON =
    respond.content === "" ? (
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
              Modifier votre réponse dans le champ ci-dessous...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="content"
              value={respond.content}
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

export default function CommentReplyUD(props) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [playDialog, setPlayDialog] = useState(null);

  const { setPlay, play } = useContext(AssoContext);

  const { response, comment, userConnected } = props.data;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseItem = () => {
    setAnchorEl(null);
  };

    const handleDelete = (response) => {
      handleCloseItem();
      axios
        .delete(`/respond/delete/${response.id}`)
        .then((res) => {
          //do something
          console.log("delete : ", res.data);
          setPlay(!play);
        })
        .catch((err) => {
          console.log("err : ", err);
        });
    };

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
        <MenuItem onClick={() => setPlayDialog(!playDialog)}>
          <FaPencil /> &nbsp;&nbsp; <span>Modifier</span>
        </MenuItem>
        <MenuItem onClick={()=> handleDelete(response)}>
          <AiOutlineDelete />
          &nbsp;&nbsp;<span>Supprimer</span>
        </MenuItem>
      </Menu>
      <FormDialog data={{ comment,response, userConnected, playDialog }} />
    </div>
  );
}
