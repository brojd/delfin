import React, {Component, PropTypes} from 'react';
import getRaceTimeInCompetition from '../../helpers/getRaceTimeInCompetition';
import getRacePlaceInCompetition from '../../helpers/getRacePlaceInCompetition';

class RaceSwimmersList extends Component {
  constructor() {
    super();
    this._handleSaveTime = this._handleSaveTime.bind(this);
    this._handleTimeChange = this._handleTimeChange.bind(this);
    this._getCurrentSchoolName = this._getCurrentSchoolName.bind(this);
    this.state = {
      swimmers: [],
      schools: []
    };
  }
  _handleSaveTime(e, swimmerId) {
    if (e.target.value < 1) {
      alert('Czas musi wynosić minimum 1 sek');
      e.target.value = 1;
    }
    this.props.saveTime(e.target.value, swimmerId);
  }
  _handleTimeChange(e, swimmerId) {
    let swimmers = this.state.swimmers;
    let swimmerIndex;
    let swimmerToChange = swimmers.filter((n, i) => {
      if (n.id == swimmerId) {
        swimmerIndex = i;
      }
      return n.id == swimmerId;
    })[0];
    swimmerToChange['time'] = e.target.value;
    swimmers[swimmerIndex] = swimmerToChange;
    this.setState({ swimmers: swimmers });
  }
  _getCurrentSchoolName(swimmerId) {
    if (this.props.schools.length > 0) {
      let currentSwimmer = this.props.swimmers.filter((n) => n.id === swimmerId)[0];
      let currentSchool = this.props.schools.filter((n) => n.id === currentSwimmer.schoolId)[0];
      return currentSchool.name;
    }
    return null;
  }
  componentDidMount() {
    let competitionId = localStorage.getItem('currentCompetitionId');
    let swimmers = this.props.swimmers;
    if (swimmers.length > 0) {
      swimmers.forEach((n) => {
        n.time = getRaceTimeInCompetition(n, this.props.raceId, competitionId);
      });
    }
    this.setState({ swimmers: swimmers });
  }
  componentWillReceiveProps(nextProps) {
    let competitionId = localStorage.getItem('currentCompetitionId');
    let swimmers = nextProps.swimmers;
    if (swimmers.length > 0) {
      swimmers.forEach((n) => {
        n.time = getRaceTimeInCompetition(n, nextProps.raceId, competitionId);
      });
    }
    this.setState({ swimmers: swimmers });
  }
  render() {
    let competitionId = localStorage.getItem('currentCompetitionId');
    return (
      <ul>
        {this.state.swimmers.map((swimmer, i) => (
          <li key={i}>
            {getRacePlaceInCompetition(swimmer, this.props.raceId, competitionId)} {swimmer.name} {swimmer.surname}
            ({this._getCurrentSchoolName(swimmer.id)})
            <input type='number'
                   step='any'
                   onBlur={(e) => this._handleSaveTime(e, swimmer.id)}
                   onChange={(e) => this._handleTimeChange(e, swimmer.id)}
                   value={swimmer.time}
                   min={1}
                   required />s
            <i onClick={() => this.props.deleteSwimmer(swimmer.id)}
               className="uk-icon-trash uk-margin-small-left">
            </i>
          </li>
        ))}
      </ul>
    );
  }
}

RaceSwimmersList.propTypes = {
  swimmers: PropTypes.array,
  schools: PropTypes.array,
  deleteSwimmer: PropTypes.func,
  raceId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  saveTime: PropTypes.func,
};

export default RaceSwimmersList;
