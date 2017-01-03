import React, {Component, PropTypes} from 'react';
import getSchoolNameById from '../../helpers/getSchoolNameById';
import styles from './ClassificationSwimmersList.stylesheet.css';

class ClassificationSwimmersList extends Component {
  constructor() {
    super();
    this._getSwimmerPoints = this._getSwimmerPoints.bind(this);
    this._getPlace = this._getPlace.bind(this);
    this.state = {};
  }
  _getPlace(sortedSwimmers, index) {
    let currSwimmer = sortedSwimmers[index];
    let upperSwimmer = sortedSwimmers[index-1];
    if (index === 0) {
      return 1;
    } else if (this._getSwimmerPoints(currSwimmer) === this._getSwimmerPoints(upperSwimmer)) {
      currSwimmer.place = upperSwimmer.place;
    } else if (this._getSwimmerPoints(currSwimmer) !== this._getSwimmerPoints(upperSwimmer)) {
      currSwimmer.place = index + 1;
    }
    return currSwimmer.place;
  }
  _getSwimmerPoints(swimmer) {
    let result = 0;
    swimmer.times.forEach((timeObj) => {
      if (!this.props.isGeneral) {
        if (timeObj.competitionId === this.props.competitionId) {
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
      <section className={styles.ClassificationSwimmersList}>
        <div className='ui one column grid center aligned'>
          <div className='fourteen wide column'>
            <table className='ui striped compact table'>
              <thead>
                <tr>
                  <th className='center aligned'>
                    <span className={styles.th_name}>Miejsce</span>
                  </th>
                  <th>
                    <span className={styles.th_name}>Imię i nazwisko</span>
                  </th>
                  <th>
                    <span className={styles.th_name}>Szkoła</span>
                  </th>
                  <th className='center aligned'>
                    <span className={styles.th_name}>Punkty</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedSwimmers.map((n, i) => (
                  <tr key={i}>
                    <td className='center aligned'>
                      {this._getPlace(sortedSwimmers, i)}
                    </td>
                    <td>
                     {n.name} {n.surname}
                    </td>
                    <td>
                      ({getSchoolNameById(this.props.schools, n.schoolId)})
                    </td>
                    <td className='center aligned'>
                      {this._getSwimmerPoints(n)} pkt
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

ClassificationSwimmersList.defaultProps = {
  schools: [],
  swimmers: []
};

ClassificationSwimmersList.propTypes = {
  swimmers: PropTypes.array,
  schools: PropTypes.array,
  isGeneral: PropTypes.bool
};

export default ClassificationSwimmersList;
