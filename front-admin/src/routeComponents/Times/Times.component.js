import React, {Component} from 'react';
import ChooseRace from '../../components/ChooseRace/ChooseRace.component';
import RaceSwimmersList from '../../components/RaceSwimmersList/RaceSwimmersList.component';
import axios from 'axios';
import CONFIG from '../../config';
import Select from 'react-select';

class Times extends Component {
  constructor() {
    super();
    this._getCategory = this._getCategory.bind(this);
    this._handleSwimmerChosen = this._handleSwimmerChosen.bind(this);
    this.state = {
      raceId: 1,
      competitionSwimmers: [],
      raceSwimmers: []
    };
  }
  _getCategory(sex, style, age) {
    console.log(sex.value, style.value, age.value);
    if (age.value == 'W1' && sex.value == 'P1' && style.value == 'S1') {
      this.setState({ raceId: 1 });
    } else if (age.value == 'W1' && sex.value == 'P1' && style.value == 'S2') {
      this.setState({ raceId: 2 });
    } else if (age.value == 'W1' && sex.value == 'P1' && style.value == 'S3') {
      this.setState({ raceId: 3 });
    } else if (age.value == 'W1' && sex.value == 'P2' && style.value == 'S1') {
      this.setState({ raceId: 4 });
    } else if (age.value == 'W1' && sex.value == 'P2' && style.value == 'S2') {
      this.setState({ raceId: 5 });
    } else if (age.value == 'W1' && sex.value == 'P2' && style.value == 'S3') {
      this.setState({ raceId: 6 });
    } else if (age.value == 'W2' && sex.value == 'P1' && style.value == 'S1') {
      this.setState({ raceId: 7 });
    } else if (age.value == 'W2' && sex.value == 'P1' && style.value == 'S2') {
      this.setState({ raceId: 8 });
    } else if (age.value == 'W2' && sex.value == 'P1' && style.value == 'S3') {
      this.setState({ raceId: 9 });
    } else if (age.value == 'W2' && sex.value == 'P2' && style.value == 'S1') {
      this.setState({ raceId: 10 });
    } else if (age.value == 'W2' && sex.value == 'P2' && style.value == 'S2') {
      this.setState({ raceId: 11 });
    } else if (age.value == 'W2' && sex.value == 'P2' && style.value == 'S3') {
      this.setState({ raceId: 12 });
    }
  }
  _handleSwimmerChosen(val) {
    let raceSwimmers = this.state.raceSwimmers;
    if (raceSwimmers.filter((n) => n.value == val.value).length > 0) {
      alert('Swimmer already added');
    } else {
      raceSwimmers.push(val);
      this.setState({ raceSwimmers: raceSwimmers });
    }
  }
  componentDidMount() {
    let currentCompetitionId = localStorage.getItem('currentCompetitionId');
    this.setState({ currentCompetitionId: currentCompetitionId });
    axios.get(`${CONFIG.API_URL}/competitions/${currentCompetitionId}/swimmers`)
      .then((res) => this.setState({ competitionSwimmers: res.data }))
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
        <RaceSwimmersList swimmers={this.state.raceSwimmers} />
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
