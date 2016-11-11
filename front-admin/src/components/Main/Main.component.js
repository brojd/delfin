import React, {Component} from 'react';
import { Router, Route } from 'react-router';
import Competitions from '../../routeComponents/Competitions/Competitions.component';
import Swimmers from '../../routeComponents/Swimmers/Swimmers.component';
import Times from '../../routeComponents/Times/Times.component';
import Classifications from '../../routeComponents/Classifications/Classifications.component';

class Nav extends Component {
  render() {
    return (
      <Router>
        <Route path='/' component={Competitions} />
        <Route path='/swimmers' component={Swimmers} />
        <Route path='/times' component={Times} />
        <Route path='/classifications' component={Classifications} />
      </Router>
    )
  }
}

export default Nav;
