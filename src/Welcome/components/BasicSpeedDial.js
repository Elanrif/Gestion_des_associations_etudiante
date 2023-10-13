import React,{useState,useEffect,useContext}  from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import InfoIcon from "@mui/icons-material/Info";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { Link , useNavigate} from "react-router-dom";
import { UserInfoContext } from "../../AuthContext";
import axios from "axios"


export default function BasicSpeedDial(props) {

  const [followAssociation ,setFollowAssociation] = useState() ; 

  const [suivre, setSuivre] = useState();

  const { userConnected, setUserConnected, userLoading, setUserLoading } =
    useContext(UserInfoContext);

  const navigate = useNavigate();

  const { follow, unfollow } = props.toast;
  const association = props.value;


    useEffect(() => {
      userFollowThisAssociation();
    }, [suivre]);

    
    const userFollowThisAssociation = () => {
      axios
        .get(
          `/association/findWithAssoIdAndUserId/${association?.id}/${userConnected?.id}`
        )
        .then((res) => {
          setFollowAssociation(res.data);
        })
        .catch((err) => {
          console.error("err : ", err);
        });
    };

  const handleFollow = () => {
   
    userLoading && setSuivre(!suivre);
    userLoading && suivre ? handleunFollowAssociation() : handleFollowAssociation();
  };

  const handleFollowAssociation = () => {
    axios
      .get(`/association/benevole/integrated/${userConnected?.id}/${association.id}`)
      .then((res) => {
         follow();
        //mettre à jour l'user dans le state dans App.js
        axios
          .get(`/user/find/${userConnected?.id}`)
          .then((response) => {
            setUserConnected(response.data);
          })
          .catch((err) => {
            console.log(" err : ", err);
          });
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };

  const handleunFollowAssociation = () => {
    axios
      .get(
        `/association/benevole/des_integrated/${userConnected?.id}/${association.id}`
      )
      .then((res) => {
        unfollow();
        //mettre à jour l'user dans le state dans App.js
        axios
          .get(`/user/find/${userConnected?.id}`)
          .then((response) => {
            setUserConnected(response.data);
          })
          .catch((err) => {
            console.log(" err : ", err);
          });
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };

  const PlayIcon =
    userConnected?.id && suivre ? (
      <OfflinePinIcon
        className={`hover:text-blue-600 ${
          suivre ? "text-blue-700" : "text-black"
        }`}
        onClick={handleFollow}
      />
    ) : (
      <UnpublishedIcon
        className={`hover:text-blue-600 ${
          suivre ? "text-blue-700" : "text-black"
        }`}
        onClick={handleFollow}
      />
    ) 


  const actions = [
    { icon: PlayIcon, name: `${suivre ? "Suivie" : "Suivre"}` },
    {
      icon: (
        <InfoIcon
          className="text-cyan-400"
          onClick={() => navigate(`/association/${association?.id}`)}
        />
      ),
      name: "Plus d'information...",
    },
  ]



  return (
    <React.Fragment>
      {association && (
        <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
             
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            
            ))}
          </SpeedDial>
        </Box>
      )}
    </React.Fragment>
  );
}
