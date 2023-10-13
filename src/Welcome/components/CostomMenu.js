import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios"


const ITEM_HEIGHT = 48;

export default function CostomMenu() {

  const navigate = useNavigate()
  const [associations,setAssociations] = React.useState([])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

React.useEffect(() => {

      display()
}, [])

const display = ()=>{
    axios.get("/association/find/all")
    .then((res)=>{
      setAssociations(res.data)
    })
    .catch((err)=>{
      console.error("err : ", err) ;
    })
}

  const handleClick_ = (e) => {
     
      handleClose(); 

      //on utilise ça pour changer '/association/id' et non juste '/id'
      navigate(`/Go-forward/${e.id}`);


      //on redirige manuellement
     // window.location.href = `/association/${e.id}`    
    
  }


  return (
    <div>
      <Tooltip title="Liste des associations" arrow>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />{" "}
        </IconButton>
      </Tooltip>

      {associations?.length > 0 && (
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "40ch",
            },
          }}
        >
          {associations.map((item, index) => (
            <MenuItem
              key={index}
              selected={item.id === 1}
              onClick={handleClose}
            >
              {/* Link ne marche pas des qu'on n'est sur la page  /association/ , il change seulement /id */}
              {/*pour palier ce problème , on va utiliser un autre composant GoForward */}
              <div onClick={() => handleClick_(item)}>
                {index + 1} - {item.name}
              </div>
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}


