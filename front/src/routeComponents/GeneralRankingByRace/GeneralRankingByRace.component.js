import React, {Component, PropTypes} from 'react';
import getSchoolNameById from '../../helpers/getSchoolNameById';
import styles from './GeneralRankingByRace.stylesheet.css';

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
      swimmers: nextProps.raceSwimmers,
      schools: nextProps.schools
    });
  }
  componentDidMount() {
    this.setState({
      swimmers: this.props.raceSwimmers,
      schools: this.props.schools
    });
  }
  render() {
    let sortedSwimmers = this.state.swimmers.slice().sort(
      (a, b) => this._getRacePoints(b, this.props.raceId) - this._getRacePoints(a, this.props.raceId)
    );
    return (
      <section className={styles.GeneralRankingByRace}>
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
                    <td className='uk-width-1-10 center aligned'>
                      {this._getPlace(sortedSwimmers, i)}
                    </td>
                    <td className='uk-width-4-10'>
                      {n.name} {n.surname}
                    </td>
                    <td className='uk-width-4-10'>
                      ({getSchoolNameById(this.state.schools, n.schoolId)})
                    </td>
                    <td className='uk-width-1-10 center aligned'>
                      {this._getRacePoints(n, this.props.raceId)} pkt
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

GeneralRankingByRace.propTypes = {
  swimmers: PropTypes.array,
  schools: PropTypes.array,
  raceId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default GeneralRankingByRace;
