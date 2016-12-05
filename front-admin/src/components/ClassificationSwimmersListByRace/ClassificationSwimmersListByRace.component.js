import React, {Component} from 'react';

class ClassificationSwimmersListByRace extends Component {
  constructor() {
    super();
    this.state = {
      sortedSwimmers: []
    };
    this._getRaceTime = this._getRaceTime.bind(this);
    this._getRacePoints = this._getRacePoints.bind(this);
    this._getSchoolName = this._getSchoolName.bind(this);
    this._getPlace = this._getPlace.bind(this);
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
  _getPlace(swimmer, raceId) {
    let timeObj = swimmer.times.filter(
      (n) => (n.raceId === raceId && n.competitionId == localStorage.getItem('currentCompetitionId'))
    );
    if (timeObj.length > 0) {
      return Number(timeObj[0].place);
    }
    return '';
  }
  _getRacePoints(swimmer, raceId) {
    let timeObj = swimmer.times.filter(
      (n) => n.raceId === raceId && n.competitionId == localStorage.getItem('currentCompetitionId')
    );
    if (timeObj.length > 0) {
      return Number(timeObj[0].points);
    }
    return 0;
  }
  _getSchoolName(schools, schoolId) {
    if (schools.length > 0) {
      return schools.filter((n) => n.id === schoolId)[0].name;
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      sortedSwimmers: nextProps.swimmers,
      schools: nextProps.schools
    });
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.sortedSwimmers.map((n, i) => (
            <li key={i}>
              {this._getPlace(n, this.props.raceId)} {n.name} {n.surname} ({this._getSchoolName(this.state.schools, n.schoolId)})
              {this._getRaceTime(n, this.props.raceId)}s {this._getRacePoints(n, this.props.raceId)} points
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ClassificationSwimmersListByRace;
