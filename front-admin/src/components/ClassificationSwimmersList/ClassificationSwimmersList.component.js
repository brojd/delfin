import React, {Component} from 'react';

class ClassificationSwimmersList extends Component {
  constructor() {
    super();
    this._getSchoolName = this._getSchoolName.bind(this);
    this._getSwimmerPoints = this._getSwimmerPoints.bind(this);
    this._getPlace = this._getPlace.bind(this);
    this.state = {};
  }
  _getPlace(swimmer, upperSwimmer, index) {
    if (index > 0 && this._getSwimmerPoints(swimmer) === this._getSwimmerPoints(upperSwimmer)) {
      return index;
    }
    return index + 1;
  }
  _getSchoolName(schools, schoolId) {
    if (schools.length > 0) {
      return schools.filter((n) => n.id === schoolId)[0].name;
    }
  }
  _getSwimmerPoints(swimmer) {
    let result = 0;
    swimmer.times.forEach((timeObj) => {
      if (!this.props.isGeneral) {
        if (timeObj.competitionId === localStorage.getItem('currentCompetitionId')) {
          result += timeObj.points;
        }
      } else {
        result += timeObj.points;
      }
    });
    return result;
  }
  render() {
    let sortedSwimmers = this.props.swimmers.slice().sort(
      (a, b) => this._getSwimmerPoints(b) - this._getSwimmerPoints(a)
    );
    return (
      <div>
        <ul>
          {sortedSwimmers.map((n, i) => (
            <li key={i}>
              {this._getPlace(n, sortedSwimmers[i-1], i)} {n.name} {n.surname} ({this._getSchoolName(this.props.schools, n.schoolId)}) {this._getSwimmerPoints(n)} points
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ClassificationSwimmersList.defaultProps = {
  schools: [],
  swimmers: []
};

export default ClassificationSwimmersList;
