import React, {Component} from 'react';

class ClassificationSchoolsList extends Component {
  constructor() {
    super();
    this._getSchoolPoints = this._getSchoolPoints.bind(this);
    this._getPlace = this._getPlace.bind(this);
    this.state = {};
  }
  _getSchoolPoints(schoolId) {
    let result = 0;
    let schoolSwimmers = this.props.swimmers.filter((n) => n.schoolId === schoolId);
    schoolSwimmers.forEach((swimmer) => {
      swimmer.times.forEach((timeObj) => {
        if (!this.props.isGeneral) {
          if (timeObj.competitionId === localStorage.getItem('currentCompetitionId')) {
            result += timeObj.points;
          }
        } else {
          result += timeObj.points;
        }
      });
    });
    return result;
  }
  _getPlace(school, upperSchool, index) {
    if (index > 0 && this._getSchoolPoints(school.id) === this._getSchoolPoints(upperSchool.id)) {
      return index;
    }
    return index + 1;
  }
  render() {
    let sortedSchools = this.props.schools.slice().sort(
      (a, b) => this._getSchoolPoints(b.id) - this._getSchoolPoints(a.id)
    );
    return (
      <div>
        <ul>
          {sortedSchools.map((school, i) =>
            <li key={i}>
              {this._getPlace(school, sortedSchools[i-1], i)} {school.name} {this._getSchoolPoints(school.id)} points
            </li>)}
        </ul>
      </div>
    );
  }
}

ClassificationSchoolsList.defaultProps = {
  schools: [],
  swimmers: []
};

export default ClassificationSchoolsList;
