import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchPage from './pages/search/Container';
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core';
import DetailsPage from './pages/details/Container';

const hoc = (Component) => (props) => {
  return (<Component {...props} />);
}

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#4D5766"
  },
  toolBar: {
    justifyContent: "space-between"
  }
});

class App extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className="container">
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
              <img src="/images/shop.png" />
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/details/:productId" component={hoc(DetailsPage)} />
            <Route component={hoc(SearchPage)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withStyles(styles)(App);