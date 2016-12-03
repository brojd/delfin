import React, {Component} from 'react';

class ClassificationSchoolsList extends Component {
  constructor() {
    super();
    this._getSchoolPoints = this._getSchoolPoints.bind(this);
    this.state = {};
  }
  _getSchoolPoints(schoolId) {
    let result = 0;
    let schoolSwimmers = this.props.swimmers.filter((n) => n.schoolId === schoolId);
    schoolSwimmers.forEach((swimmer) => {
      swimmer.times.forEach((timeObj) => {
        if (timeObj.competitionId === localStorage.getItem('currentCompetitionId')) {
          result += timeObj.points;
        }
      });
    });
    return result;
  }
  render() {
    let sortedSchools = this.props.schools.slice().sort(
      (a, b) => this._getSchoolPoints(b.id) - this._getSchoolPoints(a.id)
    );
    return (
      <div>
        <ol>
          {sortedSchools.map((school, i) => <li key={i}>{school.name} {this._getSchoolPoints(school.id)} points</li>)}
        </ol>
      </div>
    );
  }
}

ClassificationSchoolsList.defaultProps = {
  schools: [],
  swimmers: []
};

export default ClassificationSchoolsList;
