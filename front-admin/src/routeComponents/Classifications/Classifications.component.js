import React, {Component} from 'react';
import ChooseRace from '../../components/ChooseRace/ChooseRace.component';
import ClassificationSwimmersList from '../../components/ClassificationSwimmersList/ClassificationSwimmersList.component';
import axios from 'axios';
import CONFIG from '../../config';

class Classifications extends Component {
  constructor() {
    super();
    this._getCategory = this._getCategory.bind(this);
    this._updateRaceId = this._updateRaceId.bind(this);
    this._saveSwimmersPoints = this._saveSwimmersPoints.bind(this);
    this.state = {
      raceId: '',
      raceSwimmers: [],
      competitionSwimmers: []
    };
  }
  _saveSwimmersPoints() {
    let raceSwimmers = this.state.raceSwimmers;
    let ranks = this.state.competitions.filter((n) => n.id === localStorage.getItem('currentCompetitionId'))[0].ranks;
    raceSwimmers.forEach((swimmer, i) => {
      swimmer.times.forEach(
        (n, index) => {
          if (n.raceId === this.state.raceId && n.competitionId == localStorage.getItem('currentCompetitionId')) {
            swimmer.times[index].points = Number(ranks[i + 1].points);
          }
        }
      );
    });
    debugger;
    console.log(raceSwimmers);
  }
  _updateRaceId(raceId) {
    let raceSwimmers = this.state.competitionSwimmers.filter((n) => n.raceIds.includes(raceId));
    this.setState({
      raceId: raceId,
      raceSwimmers: raceSwimmers
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
        this.setState({
          competitionSwimmers: swimmersRes.data,
          raceSwimmers: raceSwimmers,
          schools: schoolsRes.data,
          competitions: competitionsRes.data
        });
      }))
      .catch((error) => console.error(error));
  }
  render() {
    return (
      <div>
        <ChooseRace getCategory={this._getCategory}/>
        <ClassificationSwimmersList swimmers={this.state.raceSwimmers}
                                    raceId={this.state.raceId}
                                    schools={this.state.schools}
                                    saveSwimmersPoints={this._saveSwimmersPoints} />
      </div>
    );
  }
}

export default Classifications;
