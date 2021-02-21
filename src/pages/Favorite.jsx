import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Typography
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import planet1 from "../planet1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${planet1})`
  },
}));

const checkFavourite = (ele) => {
  if (ele.isFavourite === true) {
    return true;
  }
  return false;
};

export default function Favorite(props) {
  const classes = useStyles();
  //console.log(props.data);

  return (
    <Container>
        <Typography variant="h4" gutterBottom>
          Favourites
        </Typography>
      <List component="nav" className={classes.root} aria-label="favorite">
        {props.data.map((element, index) => (
          <div key={index}>
            {checkFavourite(element) && (
              <ListItem button>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={element.name}/>
              </ListItem>
            )}
          </div>
        ))}
      </List>
    </Container>
  );
}
