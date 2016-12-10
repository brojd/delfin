import React, {Component} from 'react';
import getSchoolNameById from '../../helpers/getSchoolNameById';

class GeneralRankingByRace extends Component {
  constructor() {
    super();
    this.state = {
      swimmers: []
    };
    this._getRacePoints = this._getRacePoints.bind(this);
    this._getPlace = this._getPlace.bind(this);
  }
  _getRacePoints(swimmer, raceId) {
    let points = 0;
    let timeObjects = swimmer.times.filter(
      (n) => n.raceId === raceId
    );
    timeObjects.forEach((n) => {
      points += n.points;
    });
    return points;
  }
  _getPlace(swimmer, upperSwimmer, index) {
    if (index > 0 && this._getRacePoints(swimmer, this.props.raceId) === this._getRacePoints(upperSwimmer, this.props.raceId)) {
      return index;
    }
    return index + 1;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      swimmers: nextProps.swimmers,
      schools: nextProps.schools
    });
  }
  render() {
    let sortedSwimmers = this.state.swimmers.slice().sort(
      (a, b) => this._getRacePoints(b, this.props.raceId) - this._getRacePoints(a, this.props.raceId)
    );
    return (
      <div>
        <ul>
          {sortedSwimmers.map((n, i) => (
            <li key={i}>
              {this._getPlace(n, sortedSwimmers[i-1], i)}
              {n.name} {n.surname} ({getSchoolNameById(this.state.schools, n.schoolId)})
              {this._getRacePoints(n, this.props.raceId)} points
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GeneralRankingByRace;
