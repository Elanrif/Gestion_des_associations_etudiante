import React,{useState,useEffect} from "react"
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export default function BackDrop(props) {

 const [open, setOpen] = React.useState(false);
 const handleClose = () => {
   setOpen(false);
 };

 useEffect(() => {
   setOpen(true);
 }, []);

 return (
   <div>
     <Backdrop
       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
       open={open}
       /* onClick={handleClose} */
     >
       <CircularProgress color="inherit" />
     </Backdrop>
   </div>
 );

}

