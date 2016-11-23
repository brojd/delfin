import React, {Component} from 'react';
import ChooseRace from '../../components/ChooseRace/ChooseRace.component';
import RaceSwimmersList from '../../components/RaceSwimmersList/RaceSwimmersList.component';
import axios from 'axios';
import CONFIG from '../../config';
import Select from 'react-select';
import _remove from 'lodash/remove';

class Times extends Component {
  constructor() {
    super();
    this._getCategory = this._getCategory.bind(this);
    this._handleSwimmerChosen = this._handleSwimmerChosen.bind(this);
    this._deleteSwimmer = this._deleteSwimmer.bind(this);
    this._saveTime = this._saveTime.bind(this);
    this._updateRaceId = this._updateRaceId.bind(this);
    this.state = {
      raceId: 1,
      competitionSwimmers: [],
      raceSwimmers: []
    };
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
  _handleSwimmerChosen(val) {
    let raceSwimmers = this.state.competitionSwimmers.filter((n) => n.raceIds.includes(this.state.raceId));
    if (raceSwimmers.filter((n) => n == val.value).length > 0) {
      alert('Swimmer already added');
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
        axios.put(`${CONFIG.API_URL}/competitions/${localStorage.getItem('currentCompetitionId')}/swimmers/${id}`, swimmer)
          .then(() => this.setState({ raceSwimmers: raceSwimmers }))
          .catch((err) => console.error(err));
      }
    }
  }
  _saveTime(time, swimmerId) {
    let raceSwimmers = this.state.raceSwimmers;
    let swimmerToSave = this.state.raceSwimmers.filter((n) => n.id == swimmerId)[0];
    if (swimmerToSave.times.filter((n) => n.raceId == this.state.raceId).length > 0) {
      let timeIndex;
      let timeToSave = swimmerToSave.times.filter((n, i) => {
        if (n.raceId == this.state.raceId) {
          timeIndex = i;
        }
        return n.raceId == this.state.raceId;
      })[0];
      timeToSave.time = Number(time);
      swimmerToSave.times[timeIndex] = timeToSave;
      axios.put(`${CONFIG.API_URL}/swimmers/${swimmerToSave.id}`, swimmerToSave)
        .then(() => this.setState({ raceSwimmers: raceSwimmers }))
        .catch((err) => console.error(err));
    } else {
      let objToSave = {
        raceId: this.state.raceId,
        time: Number(time)
      };
      swimmerToSave.times.push(objToSave);
      axios.put(`${CONFIG.API_URL}/swimmers/${swimmerToSave.id}`, swimmerToSave)
        .then(() => {
          swimmerToSave.times.push(objToSave);
          this.setState({ raceSwimmers: raceSwimmers });
        })
        .catch((err) => console.error(err));
    }
  }
  componentDidMount() {
    let currentCompetitionId = localStorage.getItem('currentCompetitionId');
    this.setState({ currentCompetitionId: currentCompetitionId });
    axios.get(`${CONFIG.API_URL}/competitions/${currentCompetitionId}/swimmers`)
      .then((res) => {
        let raceSwimmers = res.data.filter((n) => n.raceIds.includes(this.state.raceId));
        this.setState({
          competitionSwimmers: res.data,
          raceSwimmers: raceSwimmers
        });
      })
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
        <ChooseRace getCategory={this._getCategory}/>
        <RaceSwimmersList swimmers={this.state.raceSwimmers}
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
