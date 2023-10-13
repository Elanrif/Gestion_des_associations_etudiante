import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Link,useNavigate } from "react-router-dom";
import { UserInfoContext } from "../../AuthContext";


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


export default function AuthComponent() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

const { userConnected,setUserConnected, setUserLoading } = React.useContext(UserInfoContext); 

 const navigate = useNavigate(); 
  const logout = ()=>{

    sessionStorage.removeItem("auth") 

    setUserLoading(false) /* dans ma logique on déconnecte le USER  */
    setUserConnected(null) /* si on met a null , on aura des erreus. on modifier le userConnected  a un objet {} vide comme lors de l'initialisation */
    
     //pour que dans App.js si on actualise la page le state sera initialisé par la session.
        sessionStorage.removeItem("auth")
    
    navigate("/login")
    handleClose() ; 
  }
  return (
    <React.Fragment>
      {userConnected?.id && (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Gérer votre compte">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  {...stringAvatar(
                    `${userConnected.firstName} ${userConnected.lastName}`
                  )}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {userConnected?.role === "ADMIN" && (
              <Link to="/dashboard/admin">
                <MenuItem onClick={handleClose}>
                  <Avatar /> Admin
                </MenuItem>
              </Link>
            )}
            <Link to="/dashboard/user">
              <MenuItem onClick={handleClose}>
                <Avatar /> Mon compte
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Déconneter
            </MenuItem>
          </Menu>
        </>
      )}
    </React.Fragment>
  );
}


