import React, {Component, PropTypes} from 'react';
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
  _getPlace(sortedSwimmers, index) {
    let swimmer = sortedSwimmers[index];
    let upperSwimmer = sortedSwimmers[index-1];
    if (index === 0) {
      return 1;
    } else if (this._getRacePoints(swimmer, this.props.raceId) === this._getRacePoints(upperSwimmer, this.props.raceId)) {
      swimmer.place = upperSwimmer.place;
    } else if (this._getRacePoints(swimmer, this.props.raceId) !== this._getRacePoints(upperSwimmer, this.props.raceId)) {
      swimmer.place = index + 1;
    }
    return swimmer.place;
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
              {this._getPlace(sortedSwimmers, i)}
              {n.name} {n.surname} ({getSchoolNameById(this.state.schools, n.schoolId)})
              {this._getRacePoints(n, this.props.raceId)} points
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

GeneralRankingByRace.propTypes = {
  swimmers: PropTypes.array,
  schools: PropTypes.array,
  raceId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default GeneralRankingByRace;
