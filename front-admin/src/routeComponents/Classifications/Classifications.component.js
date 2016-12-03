import React, {Component} from 'react';
import ChooseRace from '../../components/ChooseRace/ChooseRace.component';
import ClassificationSwimmersListByRace from '../../components/ClassificationSwimmersListByRace/ClassificationSwimmersListByRace.component';
import ClassificationSchoolsList from '../../components/ClassificationSchoolsList/ClassificationSchoolsList.component';
import ClassificationSwimmersList from '../../components/ClassificationSwimmersList/ClassificationSwimmersList.component';
import axios from 'axios';
import CONFIG from '../../config';

class Classifications extends Component {
  constructor() {
    super();
    this._getCategory = this._getCategory.bind(this);
    this._updateRaceId = this._updateRaceId.bind(this);
    this._getRaceTime = this._getRaceTime.bind(this);
    this.state = {
      raceId: '',
      raceSwimmers: [],
      competitionSwimmers: []
    };
  }
  _getRaceTime(swimmer, raceId) {
    let timeObj = swimmer.times.filter(
      (n) => n.raceId === raceId && n.competitionId == localStorage.getItem('currentCompetitionId')
    );
    if (timeObj.length > 0) {
      return Number(timeObj[0].time);
    }
    return 0;
  }
  _updateRaceId(raceId) {
    let raceSwimmers = this.state.competitionSwimmers.filter((n) => n.raceIds.includes(raceId));
    let sortedSwimmers = raceSwimmers.sort((a, b) =>
      this._getRaceTime(a, raceId) - this._getRaceTime(b, raceId)
    );
    this.setState({
      raceId: raceId,
      raceSwimmers: sortedSwimmers
    });
  }
  _getCategory(sex, style, age) {
    if (age.value == 'W1' && sex.value == 'P1' && style.value == 'S1') {
      this._updateRaceId(1);
    } else if (age.value == 'W1' && sex.value == 'P1' && style.value == 'S2') {
      this._updateRaceId(2);
    } else if (age.value == 'W1' && sex.value == 'P1' && style.value == 'S3') {
      this._updateRaceId(3);
    } else if (age.value == 'W1' && sex.value == 'P2' && style.value == 'S1') {
      this._updateRaceId(4);
    } else if (age.value == 'W1' && sex.value == 'P2' && style.value == 'S2') {
      this._updateRaceId(5);
    } else if (age.value == 'W1' && sex.value == 'P2' && style.value == 'S3') {
      this._updateRaceId(6);
    } else if (age.value == 'W2' && sex.value == 'P1' && style.value == 'S1') {
      this._updateRaceId(7);
    } else if (age.value == 'W2' && sex.value == 'P1' && style.value == 'S2') {
      this._updateRaceId(8);
    } else if (age.value == 'W2' && sex.value == 'P1' && style.value == 'S3') {
      this._updateRaceId(9);
    } else if (age.value == 'W2' && sex.value == 'P2' && style.value == 'S1') {
      this._updateRaceId(10);
    } else if (age.value == 'W2' && sex.value == 'P2' && style.value == 'S2') {
      this._updateRaceId(11);
    } else if (age.value == 'W2' && sex.value == 'P2' && style.value == 'S3') {
      this._updateRaceId(12);
    }
  }
  componentDidMount() {
    let currentCompetitionId = localStorage.getItem('currentCompetitionId');
    this.setState({ currentCompetitionId: currentCompetitionId });
    axios.all([
      axios.get(`${CONFIG.API_URL}/competitions/${currentCompetitionId}/swimmers`),
      axios.get(`${CONFIG.API_URL}/schools`),
      axios.get(`${CONFIG.API_URL}/competitions`)
    ])
      .then(axios.spread((swimmersRes, schoolsRes, competitionsRes) => {
        let raceSwimmers = swimmersRes.data.filter((n) => n.raceIds.includes(this.state.raceId));
        let sortedSwimmers = raceSwimmers.sort((a, b) =>
          this._getRaceTime(a, this.state.raceId) - this._getRaceTime(b, this.state.raceId)
        );
        this.setState({
          competitionSwimmers: swimmersRes.data,
          raceSwimmers: sortedSwimmers,
          schools: schoolsRes.data,
          competitions: competitionsRes.data
        });
      }))
      .catch((error) => console.error(error));
  }
  render() {
    return (
      <div>
        <h3 className='uk-text-center uk-margin-top'>Ranking zawodników wg kategorii</h3>
        <ChooseRace getCategory={this._getCategory}/>
        <ClassificationSwimmersListByRace swimmers={this.state.raceSwimmers}
                                    raceId={this.state.raceId}
                                    schools={this.state.schools} />
        <h3 className='uk-text-center uk-margin-large-top'>Ranking zawodników</h3>
        <ClassificationSwimmersList schools={this.state.schools}
                                    swimmers={this.state.competitionSwimmers} />
        <h3 className='uk-text-center uk-margin-large-top'>Ranking szkół</h3>
        <ClassificationSchoolsList schools={this.state.schools}
                                   swimmers={this.state.competitionSwimmers} />
      </div>
    );
  }
}

export default Classifications;
