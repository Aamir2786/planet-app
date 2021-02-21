import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Axios from "axios";
import planet from "../planet.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${planet})`,
  },
}));

export default function Planet(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [fill, setFill] = useState({});

  const getData = async () => {
    await Axios.get("https://assignment-machstatz.herokuapp.com/planet", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        //console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const changeColorFill = (i) => {
    //console.log(fill);
    if (fill[i] === undefined || fill[i] === "action") {
      setFill((prevState) => ({
        ...prevState,
        [i]: "secondary",
      }));
      data[i].isFavourite = true;
      props.handleState(data);
    } else {
      setFill((prevState) => ({
        ...prevState,
        [i]: "action",
      }));
      data[i].isFavourite = false;
      props.handleState(data);
    }
  };

  return (
    <Container>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Planet List
        </Typography>
        <List dense={true}>
          {data.map((planetItem, i) => (
            <ListItem key={i} button>
              <ListItemAvatar>
                <Avatar>
                  <StarIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={planetItem.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="favorite"
                  onClick={() => {
                    changeColorFill(i);
                  }}
                >
                  <FavoriteIcon color={fill[i]} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
}
