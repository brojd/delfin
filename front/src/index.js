import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OuterMain from './components/Main/OuterMain.component';
import GeneralRankings from './routeComponents/GeneralRankings/GeneralRankings.component';
import OuterClassifications from './routeComponents/Classifications/OuterClassifications.component';
import GeneralRankingByRace from './routeComponents/GeneralRankingByRace/GeneralRankingByRace.component';
import ClassificationSwimmersListByRace from './routeComponents/ClassificationSwimmersListByRace/ClassificationSwimmersListByRace.component';
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
          <Route component={OuterClassifications}>
            <Route path='competition/:competitionId'  component={ClassificationSwimmersListByRace} />
            <Route path='competition-swimmers' component={ClassificationSwimmersList} />
            <Route path='competition-schools' component={ClassificationSchoolsList} />
          </Route>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
