import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {MdPlace} from "react-icons/md"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardMainSection(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {event} = props 

  /* si on n'est pas l'association/1 , ce composant sera générer et n'aura pas un props.event sera a null
   donc tjrs vérifier pour prendre en compte cette INFO
    */
  return (
    <>
      {event && (
        <Card sx={{ maxWidth: 360, height: 560 }} className="overflow-auto">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {event.type.slice(0, 1)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`${event.type}`}
            subheader={`${event.date}`}
          />
          <CardMedia
            component="img"
            height="194"
            image={`data:image/jpeg;base64,${event.image}`}
            alt="Paella dish"
            className="h-[200px]"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Description : {event.descp}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <BookmarkIcon />
            </IconButton>
          </CardActions>
          <CardContent>
            <Typography paragraph className=" flex items-end">
              <MdPlace size="2rem" className="text-red-800" />{" "}
              <p className="text-slate-600 italic"> Mixta Bloc 6 Appart 33</p>
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
