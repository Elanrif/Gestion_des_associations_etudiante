import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { MdDelete } from "react-icons/md";
import axios from "axios"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

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

export default function DeleteAe(props) {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleAe =()=> {

       if(props.association){
       
        axios
           .delete(
             `http://localhost:8080/association/v1/delete/${props.association.id}`
           )
           .then((response) => {

            /*executer la fonction du props....loadAsso , pour que dans le Parent les Associations soit mis à jour */
            
            props.loadAsso() ; 

             console.log("supprimé : ", response.data);

           })
           .catch((error) => {
             console.log("Error : ", error);
           });

           handleClose();

      }else if(props.event){
         axios
           .delete(
             `http://localhost:8080/event/v1/delete/${props.event.id}`
           )
           .then((response) => {
             console.log("supprimé : ", response.data);
           })
           .catch((error) => {
             console.log("Error : ", error);
           });
      }
      else{
        alert("Erreur , aucune association trouvé ")
      }

      handleClose();
  }

  const display = () => {

    if (props.association != null) {
      return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="rounded-xl">
              <Typography
                id="transition-modal-title"
                sx={{ marginBottom: 5 }}
                variant="h6"
                component="h2"
              >
                <span className="text-orange-100">Message d'alert </span>
              </Typography>

              <Typography sx={{ marginBottom: 5, marginTop: 5 }}>
                Voulez-vous vraiemnt supprimer cette association :{" "}
                <span className="text-blue-300">
                  {" "}
                  {props.association.name} ?
                </span>{" "}
              </Typography>

              <div>
                <Button
                  onClick={deleAe}
                  sx={{ marginRight: 3 }}
                  variant="outlined"
                  color="error"
                >
                  oui
                </Button>
                <Button onClick={handleClose} variant="outlined">
                  Fermer
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      );
    } else if (props.event != null) {
      return (
        <Modal
          aria-labelledby="transition-modal-membre"
          aria-describedby="transition-modal-descrpt"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="rounded-xl">
              <Typography
                id="transition-modal-membre"
                sx={{ marginBottom: 5 }}
                variant="h6"
                component="h2"
              >
                <span className="text-orange-100">Message d'alert</span>
              </Typography>

              <Typography
                sx={{ marginBottom: 5, marginTop: 5 }}
                id="transition-modal-membre"
              >
                Voulez-vous vraiemnt supprimer cette évènement : ?
                <span className="text-blue-300">
                  {" "}
                  --- {/* {props.event.name} */}{" "}
                </span>{" "}
              </Typography>

              <div>
                <Button
                  onClick={deleAe}
                  sx={{ marginRight: 3 }}
                  variant="outlined"
                  color="error"
                >
                  oui
                </Button>
                <Button onClick={handleClose} variant="outlined">
                  Fermer
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      );
    } else {
      return "bonjour";
    }
  };

  return (
    <div>
      <BootstrapTooltip title="Supprimer" onClick={handleOpen}>
        <div
          className="group flex items-center justify-center"
        >
          <MdDelete
            size="1.5rem"
            className="text-black group-hover:cursor-pointer group-hover:text-red-300 duration-300"
          />
        </div>
      </BootstrapTooltip>

      {display()}
    </div>
  );
}
