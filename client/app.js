import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchPage from './pages/search/Container';
import DetailsPage from './pages/details/Container';
import AppBar from './components/AppBar';

const hoc = (Component) => (props) => {
  return (<Component {...props} />);
}

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className="container">
          <AppBar />
          <Switch>
            <Route path="/details/:productId" component={hoc(DetailsPage)} />
            <Route component={hoc(SearchPage)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;