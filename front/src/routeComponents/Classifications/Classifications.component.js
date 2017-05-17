import React, {Component} from 'react';
import ChooseRace from '../../components/ChooseRace/ChooseRace.component';
import getRaceIdByCategory from '../../helpers/getRaceIdByCategory';
import isSwimmerRanked from '../../helpers/isSwimmerRanked';
import classNames from 'classnames';
import styles from './Classifications.stylesheet.css';
import { Link } from 'react-router';

class Classifications extends Component {
  constructor() {
    super();
    this._getRaceSwimmers = this._getRaceSwimmers.bind(this);
    this._getCategory = this._getCategory.bind(this);
    this._updateRaceId = this._updateRaceId.bind(this);
    this._getRaceTime = this._getRaceTime.bind(this);
    this._setActiveLink = this._setActiveLink.bind(this);
    this.state = {
      raceId: 1,
      raceSwimmers: [],
      schools: [],
      activeLinkIndex: 0
    };
  }
  _getRaceSwimmers(swimmers, raceId, competitionId) {
    return swimmers.filter((swimmer) => {
      let swimmerTimes = swimmer.times.filter(time =>
        time.raceId == raceId &&
        time.competitionId == competitionId
      );
      return swimmerTimes.length > 0;
    });
  }
  _getRaceTime(swimmer, raceId) {
    let timeObj = swimmer.times.filter(
      (n) => n.raceId === raceId && n.competitionId == this.props.competitionId
    );
    if (timeObj.length > 0) {
      return Number(timeObj[0].time);
    }
    return 0;
  }
  _updateRaceId(raceId) {
    let raceSwimmers = this._getRaceSwimmers(this.props.competitionSwimmers, raceId, this.props.competitionId)
    let sortedSwimmers = raceSwimmers.sort((a, b) =>
      this._getRaceTime(a, raceId) - this._getRaceTime(b, raceId)
    );
    this.setState({
      raceId: raceId,
      raceSwimmers: sortedSwimmers
    });
  }
  _getCategory(sex, style, age) {
    let currentId = getRaceIdByCategory(sex, style, age);
    this._updateRaceId(currentId);
  }
  _setActiveLink(linkIndex) {
    this.setState({ activeLinkIndex: linkIndex });
  }
  componentDidMount() {
    let raceSwimmers = this._getRaceSwimmers(this.props.competitionSwimmers, this.state.raceId, this.props.competitionId)
    let sortedSwimmers = raceSwimmers.sort((a, b) =>
      this._getRaceTime(a, this.state.raceId) - this._getRaceTime(b, this.state.raceId)
    );
    this.setState({
      raceSwimmers: sortedSwimmers
    });
    this._updateRaceId(1);
  }
  render() {
    let competitionId = this.props.competitionId;
    let raceSwimmers = this.state.raceSwimmers.filter((swimmer) => isSwimmerRanked(swimmer, this.props.schools));
    let competitionSwimmers = this.props.competitionSwimmers.filter(
      (swimmer) => isSwimmerRanked(swimmer, this.props.schools)
    );
    let rankedSchools = this.props.schools.filter((n) => n.isRanked);
    let formHidden = window.location.pathname === '/competition-swimmers' ||
      window.location.pathname === '/competition-schools';
    return (
      <section>
        <nav className={classNames('ui top attached tabular menu', styles.navbar)}>
          <div className={classNames(styles.tab, {[styles.activeTab]:this.state.activeLinkIndex===0})}>
            <Link to={`/competition/${competitionId}`}
                  className='item'
                  onClick={() => { this._setActiveLink(0); }}>
              <span className={styles.navbar_label}>Wyniki wg kategorii</span>
            </Link>
          </div>
          <div className={classNames(styles.tab, {[styles.activeTab]:this.state.activeLinkIndex===1})}>
            <Link to={`/competition/${competitionId}/swimmers`}
                  className='item'
                  onClick={() => { this._setActiveLink(1); }}>
              <span className={styles.navbar_label}>Ranking zawodników</span>
            </Link>
          </div>
          <div className={classNames(styles.tab, {[styles.activeTab]:this.state.activeLinkIndex===2})}>
            <Link to={`/competition/${competitionId}/schools`}
                  className='item'
                  onClick={() => { this._setActiveLink(2); }}>
              <span className={styles.navbar_label}>Ranking szkół</span>
            </Link>
          </div>
        </nav>
        <section className={classNames('bottom attached segment', styles.rankingSection)}>
          <div className={classNames({[styles.displayNone]: formHidden})}>
            <ChooseRace getCategory={this._getCategory}/>
          </div>
          {this.props.children && React.cloneElement(this.props.children, {
            raceSwimmers: raceSwimmers,
            raceId: this.state.raceId,
            schools: this.props.schools,
            rankedSchools: rankedSchools,
            swimmers: competitionSwimmers,
            competitionId: competitionId,
            isGeneral: false
          })}
        </section>
      </section>
    );
  }
}

export default Classifications;
