import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

function PageNotFound() {

     const [open, setOpen] = React.useState(false);
     const handleClose = () => {
       setOpen(false);
     };
   

    const navigate = useNavigate() 

    useEffect(() => {
        
        setOpen(true)

        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }, [])

  return (
    <>
      <div className="flex bg-slate-50 h-[100vh] items-center justify-center text-3xl font-semibold">
        <p> Oups Aucune page n'a été trouvé</p>

        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>
    </>
  );
}

export default PageNotFound
