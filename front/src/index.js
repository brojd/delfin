import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OuterMain from './components/Main/OuterMain.component';
import GeneralRankings from './routeComponents/GeneralRankings/GeneralRankings.component';
import Classifications from './routeComponents/Classifications/Classifications.component';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route component={OuterMain}>
          <IndexRoute component={GeneralRankings}/>
          <Route path='competition' component={Classifications}/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
