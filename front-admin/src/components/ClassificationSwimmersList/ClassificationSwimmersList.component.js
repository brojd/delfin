import React, {Component} from 'react';

class ClassificationSwimmersList extends Component {
  constructor() {
    super();
    this.state = {
      sortedSwimmers: []
    };
    this._getRaceTime = this._getRaceTime.bind(this);
    this._getSchoolName = this._getSchoolName.bind(this);
  }
  _getRaceTime(swimmer, raceId) {
    let timeObj = swimmer.times.filter(
      (n) => n.raceId === raceId && n.competitionId == localStorage.getItem('currentCompetitionId')
    );
    if (timeObj.length > 0) {
      return Number(timeObj[0].time);
    }
    return 'brak';
  }
  _getSchoolName(schools, schoolId) {
    if (schools.length > 0) {
      return schools.filter((n) => n.id === schoolId)[0].name;
    }
  }
  componentWillReceiveProps(nextProps) {
    let sortedSwimmers = nextProps.swimmers.sort((a, b) =>
      this._getRaceTime(a, nextProps.raceId) - this._getRaceTime(b, nextProps.raceId)
    );
    this.setState({
      sortedSwimmers: sortedSwimmers,
      schools: nextProps.schools
    });
  }
  render() {
    return (
      <div>
        <ol>
          {this.state.sortedSwimmers.map((n, i) => (
            <li key={i}>
              {n.name} {n.surname} ({this._getSchoolName(this.state.schools, n.schoolId)}) {this._getRaceTime(n, this.props.raceId)}s
            </li>
          ))}
        </ol>
        <button onClick={this.props.saveSwimmersPoints} className='uk-button'>Przypisz punkty</button>
      </div>
    );
  }
}

export default ClassificationSwimmersList;
