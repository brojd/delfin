import React, {Component} from 'react';
import styles from './ClassificationSchoolsList.stylesheet.css';

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
          if (timeObj.competitionId === this.props.competitionId) {
            result += timeObj.points;
          }
        } else {
          result += timeObj.points;
        }
      });
    });
    return result;
  }
  _getPlace(sortedSchools, index) {
    let school = sortedSchools[index];
    let upperSchool = sortedSchools[index-1];
    if (index === 0) {
      return 1;
    } else if (index > 0 && this._getSchoolPoints(school.id) === this._getSchoolPoints(upperSchool.id)) {
      school.place = upperSchool.place;
    } else if (index > 0 && this._getSchoolPoints(school.id) !== this._getSchoolPoints(upperSchool.id)) {
      school.place = index + 1;
    }
    return school.place;
  }
  render() {
    let sortedSchools = this.props.rankedSchools.slice().sort(
      (a, b) => this._getSchoolPoints(b.id) - this._getSchoolPoints(a.id)
    );
    return (
      <section className={styles.ClassificationSchoolsList}>
        <div className='ui one column grid center aligned'>
          <div className='fourteen wide column'>
            <table className='ui striped compact table'>
              <thead>
                <tr>
                  <th className='center aligned'>
                    <span className={styles.th_name}>Miejsce</span>
                  </th>
                  <th>
                    <span className={styles.th_name}>Nazwa</span>
                  </th>
                  <th className='center aligned'>
                    <span className={styles.th_name}>Punkty</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedSchools.map((school, i) =>
                  <tr key={i}>
                    <td className='center aligned'>
                      {this._getPlace(sortedSchools, i)}
                    </td>
                    <td>
                      {school.name}
                    </td>
                    <td className='center aligned'>
                      {this._getSchoolPoints(school.id)} pkt
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

ClassificationSchoolsList.defaultProps = {
  schools: [],
  swimmers: []
};

export default ClassificationSchoolsList;
