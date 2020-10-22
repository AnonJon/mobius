import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Cart from "./components/cart";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: "rgb(113,214, 195)",
  },
  logo: {
    height: "70px",
    width: "70px",
  },
}));
function App() {
  const classes = useStyles();
  return (
    <Router>
      <AppBar className={classes.appBar}>
        <div className={classes.root}>
          <Link to="/">
            <img
              alt=""
              className={classes.logo}
              src={require("../src/images/mobius_logo.png")}
            />
          </Link>
        </div>
      </AppBar>
      <Switch>
        <Route path="/dashboard" component={Cart} />
      </Switch>
    </Router>
  );
}

export default App;
