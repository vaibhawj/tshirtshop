import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchPage from './pages/search/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const hoc = (Component) => (props) => {
  return (<Component {...props} />);
}

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#4D5766"
  }
});

class App extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className="container">
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <img src="images/shop.png"/>
            </Toolbar>
          </AppBar>
          <Switch>
            {/* <Route exact path="/room/:roomName" component={hoc(Chat)} /> */}
            <Route component={hoc(SearchPage)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withStyles(styles)(App);