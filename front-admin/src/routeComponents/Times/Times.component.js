import React, {Component} from 'react';
import ChooseRace from '../../components/ChooseRace/ChooseRace.component';
import RaceSwimmersList from '../../components/RaceSwimmersList/RaceSwimmersList.component';
import axios from 'axios';
import CONFIG from '../../config';
import Select from 'react-select';
import _remove from 'lodash/remove';
import _uniqBy from 'lodash/uniqBy';

class Times extends Component {
  constructor() {
    super();
    this._getCategory = this._getCategory.bind(this);
    this._handleSwimmerChosen = this._handleSwimmerChosen.bind(this);
    this._deleteSwimmer = this._deleteSwimmer.bind(this);
    this._saveTime = this._saveTime.bind(this);
    this._updateRaceId = this._updateRaceId.bind(this);
    this._saveSwimmersPoints = this._saveSwimmersPoints.bind(this);
    this.state = {
      raceId: 1,
      competitionSwimmers: [],
      raceSwimmers: []
    };
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
    } else if (age.value == 'W3' && sex.value == 'P1' && style.value == 'S1') {
      this._updateRaceId(7);
    } else if (age.value == 'W3' && sex.value == 'P1' && style.value == 'S2') {
      this._updateRaceId(8);
    } else if (age.value == 'W3' && sex.value == 'P1' && style.value == 'S3') {
      this._updateRaceId(9);
    } else if (age.value == 'W3' && sex.value == 'P2' && style.value == 'S1') {
      this._updateRaceId(10);
    } else if (age.value == 'W3' && sex.value == 'P2' && style.value == 'S2') {
      this._updateRaceId(11);
    } else if (age.value == 'W3' && sex.value == 'P2' && style.value == 'S3') {
      this._updateRaceId(12);
    }
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
  _saveSwimmersPoints(raceId) {
    let raceSwimmers = this.state.raceSwimmers;
    let ranks = this.state.competitions.filter((n) => n.id === localStorage.getItem('currentCompetitionId'))[0].ranks;
    let sortedSwimmers = raceSwimmers.sort((a, b) =>
      this._getRaceTime(a, raceId) - this._getRaceTime(b, raceId)
    );
    sortedSwimmers.forEach((swimmer, i) => {
      swimmer.times.forEach(
        (n, index) => {
          if (n.raceId === raceId && n.competitionId == localStorage.getItem('currentCompetitionId')) {
            if (swimmer.times[index].time > 0) {
              if (i > 10) {
                swimmer.times[index].points = Number(ranks.slice(-1).points);
              } else if (i > 0 && this._getRaceTime(swimmer, raceId) === this._getRaceTime(sortedSwimmers[i-1], raceId)) {
                swimmer.times[index].points = Number(ranks[i].points);
              } else {
                swimmer.times[index].points = Number(ranks[i + 1].points);
              }
            }
          }
        }
      );
    });
    axios.all([
      sortedSwimmers.map((n, i) => axios.put(`${CONFIG.API_URL}/swimmers`, sortedSwimmers[i]))
    ])
      .then(() => this.setState({ raceSwimmers: sortedSwimmers }))
      .catch((err) => console.error(err));
  }
  _handleSwimmerChosen(val) {
    let raceSwimmers = this.state.competitionSwimmers.filter((n) => n.raceIds.includes(this.state.raceId));
    let competitionTimes = val.value.times.filter(
      (n) => n.competitionId === localStorage.getItem('currentCompetitionId')
    );
    if (raceSwimmers.filter((n) => n == val.value).length > 0) {
      alert('Zawodnik został już dodany');
      return false;
    } else if (_uniqBy(competitionTimes, 'raceId').length >= 2) {
      alert('Zawodnik bierze udział w dwóch wyścigach');
      return false;
    } else {
      let swimmerToSave = val.value;
      swimmerToSave.raceIds.push(this.state.raceId);
      axios.put(`${CONFIG.API_URL}/swimmers/${swimmerToSave.id}`, swimmerToSave)
        .then(() => {
          raceSwimmers.push(swimmerToSave);
          this.setState({ raceSwimmers: raceSwimmers });
        })
        .catch((err) => console.error(err));
    }
  }
  _deleteSwimmer(id) {
    let raceSwimmers = this.state.raceSwimmers;
    for (let swimmer of raceSwimmers) {
      if (swimmer.id == id) {
        _remove(swimmer.raceIds, (n) => n === this.state.raceId);
        _remove(swimmer.times, (n) => n.raceId === this.state.raceId);
        axios.put(`${CONFIG.API_URL}/competitions/${localStorage.getItem('currentCompetitionId')}/swimmers/${id}`, swimmer)
          .then(() => {
            let newRaceSwimmers = raceSwimmers.filter((n) => n.id !== id);
            this.setState({ raceSwimmers: newRaceSwimmers});
          })
          .catch((err) => console.error(err));
      }
    }
  }
  _saveTime(time, swimmerId) {
    const alreadyHasRaceTime = (swimmer, nb) => swimmer.times.filter((n) => {
      return (n.raceId == this.state.raceId && n.competitionId == localStorage.getItem('currentCompetitionId'));
    }).length > nb;
    let raceSwimmers = this.state.raceSwimmers.slice();
    let swimmerToSave = raceSwimmers.filter((n) => n.id == swimmerId)[0];
    if (alreadyHasRaceTime(swimmerToSave, 0)) {
      let timeIndex;
      let timeToSave = swimmerToSave.times.filter((n, i) => {
        if (n.raceId == this.state.raceId && n.competitionId == localStorage.getItem('currentCompetitionId')) {
          timeIndex = i;
        }
        return n.raceId == this.state.raceId && n.competitionId == localStorage.getItem('currentCompetitionId');
      })[0];
      timeToSave.time = Number(time);
      swimmerToSave.times[timeIndex] = timeToSave;
      axios.put(`${CONFIG.API_URL}/swimmers/${swimmerToSave.id}`, swimmerToSave)
        .then(() => this.setState({ raceSwimmers: raceSwimmers }))
        .catch((err) => console.error(err));
    } else {
      let objToSave = {
        raceId: this.state.raceId,
        competitionId: localStorage.getItem('currentCompetitionId'),
        time: Number(time)
      };
      swimmerToSave.times.push(objToSave);
      axios.put(`${CONFIG.API_URL}/swimmers/${swimmerToSave.id}`, swimmerToSave)
        .then(() => {
          this.setState({ raceSwimmers: raceSwimmers });
        })
        .catch((err) => console.error(err));
    }
    this._saveSwimmersPoints(this.state.raceId);
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
          competitionSchools: schoolsRes.data,
          competitions: competitionsRes.data
        });
      }))
      .catch((error) => console.error(error));
  }
  render() {
    let swimmerChoices = this.state.competitionSwimmers.map((n) => {
      return {
        value: n,
        label: `${n.name} ${n.surname}`
      };
    });
    return (
      <div>
        <h3 className='uk-text-center uk-margin-top uk-margin-bottom'>Wyniki</h3>
        <ChooseRace getCategory={this._getCategory}/>
        <RaceSwimmersList swimmers={this.state.raceSwimmers}
                          schools={this.state.competitionSchools}
                          deleteSwimmer={this._deleteSwimmer}
                          raceId={this.state.raceId}
                          saveTime={this._saveTime}/>
        <Select
          name='swimmer'
          options={swimmerChoices}
          onChange={this._handleSwimmerChosen}
          className='uk-width-2-10 uk-display-inline-block uk-margin-large-right'
        />
      </div>
    );
  }
}

export default Times;
