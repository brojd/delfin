import React, {Component} from 'react';
import Main from '../Main/Main.component';
import { Router, Route } from 'react-router';
import Competitions from '../Competitions/Competitions.component';
import Swimmers from '../Swimmers/Swimmers.component';
import Times from '../Times/Times.component';
import Classifications from '../Classifications/Classifications.component';
import Schools from '../Schools/Schools.component';
import MainLayout from '../MainLayout/MainLayout.component';
import GeneralRankings from '../GeneralRankings/GeneralRankings.component';
import Records from '../Records/Records.component';

class App extends Component {
  render() {
    return (
      <Router>
        <Route component={MainLayout}>
          <Route component={Main}>
            <Route path='/' component={Competitions} />
            <Route path='/swimmers' component={Swimmers} />
            <Route path='/times' component={Times} />
            <Route path='/classifications' component={Classifications} />
            <Route path='/schools' component={Schools} />
            <Route path='/general-rankings' component={GeneralRankings} />
            <Route path='/records' component={Records} />
          </Route>
        </Route>
      </Router>
    );
  }
}

export default App;
