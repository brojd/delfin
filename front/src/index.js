import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OuterMain from './components/Main/OuterMain.component';
import GeneralRankings from './routeComponents/GeneralRankings/GeneralRankings.component';
import Classifications from './routeComponents/Classifications/Classifications.component';
import GeneralRankingByRace from './routeComponents/GeneralRankingByRace/GeneralRankingByRace.component';
import ClassificationSwimmersList from './routeComponents/ClassificationSwimmersList/ClassificationSwimmersList.component';
import ClassificationSchoolsList from './routeComponents/ClassificationSchoolsList/ClassificationSchoolsList.component';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route component={OuterMain}>
          <Route component={GeneralRankings}>
            <IndexRoute component={GeneralRankingByRace}/>
            <Route path='general-ranking-swimmers' component={ClassificationSwimmersList} />
            <Route path='general-ranking-schools' component={ClassificationSchoolsList} />
          </Route>
          <Route path='competition' component={Classifications}/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
