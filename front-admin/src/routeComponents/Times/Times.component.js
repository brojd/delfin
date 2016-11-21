import React, {Component} from 'react';
import ChooseRace from '../../components/ChooseRace/ChooseRace.component';

class Times extends Component {
  constructor() {
    super();
    this._getCategory = this._getCategory.bind(this);
    this.state = {
      raceId: 1
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
  render() {
    return (
      <div>
        <ChooseRace getCategory={this._getCategory}/>
        Race {this.state.raceId}
      </div>
    );
  }
}

export default Times;
