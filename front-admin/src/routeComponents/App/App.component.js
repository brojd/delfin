import React, {Component} from 'react';
import Main from '../../components/Main/Main.component';
import { Router, Route, IndexRoute } from 'react-router';
import Competitions from '../../routeComponents/Competitions/Competitions.component';
import Swimmers from '../../routeComponents/Swimmers/Swimmers.component';
import Times from '../../routeComponents/Times/Times.component';
import Classifications from '../../routeComponents/Classifications/Classifications.component';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' component={Main}>
          <IndexRoute component={Competitions} />
          <Route path='/swimmers' component={Swimmers} />
          <Route path='/times' component={Times} />
          <Route path='/classifications' component={Classifications} />
        </Route>
      </Router>
    )
  }
}

export default App;
