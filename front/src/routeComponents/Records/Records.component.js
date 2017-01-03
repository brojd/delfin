import React, {Component} from 'react';
import ChooseRace from '../../components/ChooseRace/ChooseRace.component';
import getRaceIdByCategory from '../../helpers/getRaceIdByCategory';
import getSchoolNameById from '../../helpers/getSchoolNameById';
import styles from './Records.stylesheet.css';
import classNames from 'classnames';

class Records extends Component {
  constructor() {
    super();
    this._getCategory = this._getCategory.bind(this);
    this._updateRaceId = this._updateRaceId.bind(this);
    this._getRecordInCategory = this._getRecordInCategory.bind(this);
    this.state = {
      raceId: 1
    };
  }
  _updateRaceId(raceId) {
    this.setState({
      raceId: raceId
    });
  }
  _getCategory(sex, style, age) {
    let currentId = getRaceIdByCategory(sex, style, age);
    this._updateRaceId(currentId);
  }
  _getRecordInCategory(swimmers, raceId) {
    let sortedSwimmers = swimmers.sort((a, b) => {
      let bestTimeA = a.times.filter((n) => n.raceId === raceId).sort((c, d) => c.time - d.time)[0].time;
      let bestTimeB = b.times.filter((n) => n.raceId === raceId).sort((c, d) => c.time - d.time)[0].time;
      return bestTimeA - bestTimeB;
    });
    let recordTime = sortedSwimmers[0].times.filter((n) => n.raceId === raceId).sort((c, d) => c.time - d.time)[0].time;
    let time = sortedSwimmers ? recordTime : '';
    let result = {
      swimmer: sortedSwimmers[0],
      time: time
    };
    return result;
  }

  render() {
    let raceSwimmers = this.props.swimmers.filter((n) => n.raceIds.includes(this.state.raceId));
    let recordOwner = '';
    let record = '';
    if (raceSwimmers.length > 0) {
      const resultObj = this._getRecordInCategory(raceSwimmers, this.state.raceId);
      recordOwner = `${resultObj.swimmer.name} ${resultObj.swimmer.surname}
                    (${getSchoolNameById(this.props.schools, resultObj.swimmer.schoolId)})`;
      record = `${resultObj.time} sek`;
    }
    return (
      <section className={classNames(styles.Records, 'bottom attached segment')}>
        <ChooseRace getCategory={this._getCategory} className={styles.ChooseRace}/>
        <section className={classNames(styles.recordSection, 'ui grid center aligned')}>
          <div className='ten wide column'>
            <div className="ui icon message">
              <i className="flag checkered icon"></i>
              <div className="content">
                <div className="header">
                  {recordOwner}
                </div>
                <p>{record}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default Records;
