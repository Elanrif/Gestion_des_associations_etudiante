import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    
      <button
        onClick={handleClickOpen}
        className="mt-3 focus:outline-1 focus:outline-offset-1 focus:outline-white mx-auto px-2 py-3 rounded-lg text-xl font-semibold hover:bg-orange-300 bg-orange-500"
      >
        je m'inscris
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>S'inscrire</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour s'inscrire au newsletter, veuillez entrer votre email ici s'il
            vous plaît. Rester connecté sur toute nouvelle information.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleClose}>Confirmé</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
