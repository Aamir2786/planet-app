import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom';
import { 
  Drawer, List, ListItem, ListItemIcon, ListItemText, 
  } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Planet from './pages/Planet.jsx'; 
import Favorite from './pages/Favorite.jsx'; 

const useStyles = makeStyles((theme) => ({
  drawerPaper: {width: 'inherit'},
  link: { textDecoration: 'none', 
  color: theme.palette.text.primary
  }
}))

function App() {
  const  classes = useStyles();
  const [state, setState] = useState([]);
  const handleState = (e) => {
    setState(e);
  };
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Drawer
          style={{ width: "220px" }}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={"Planet"} />
              </ListItem>
            </Link>
            <Link to="/favorite" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary={"Favourite"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Switch>
          <Route exact path="/">
            <Planet handleState={(e) => {handleState(e)}} />
          </Route>
          <Route exact path="/favorite">
            <Favorite data={state} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
