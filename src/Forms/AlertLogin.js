import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertLogin({alert}) {

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {

   alert !== 0 &&  setOpen(true)

   alert !== 0 && setTimeout(() => {
       setOpen(false)
   }, 5000);

  }, [alert])

  return (
    <div className="max-w-xl mx-auto mt-3">
      <Box>
        <Collapse in={open}>
         
          <Alert
            variant="outlined"
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Oups Aucun utilisateur trouvé — vérifier vos informations!
          </Alert>
        </Collapse>
      </Box>
    </div>
  );
}
