import React, {Component, PropTypes} from 'react';
import ChooseRace from '../../components/ChooseRace/ChooseRace.component';
import getRaceIdByCategory from '../../helpers/getRaceIdByCategory';
import isSwimmerRanked from '../../helpers/isSwimmerRanked';
import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './GeneralRankings.stylesheet.css';

class GeneralRankings extends Component {
  constructor() {
    super();
    this._getCategory = this._getCategory.bind(this);
    this._updateRaceId = this._updateRaceId.bind(this);
    this._getRaceTime = this._getRaceTime.bind(this);
    this._setActiveLink = this._setActiveLink.bind(this);
    this.state = {
      raceId: 1,
      raceSwimmers: [],
      activeLinkIndex: 0
    };
  }
  _getRaceTime(swimmer, raceId) {
    let timeObj = swimmer.times.filter(
      (n) => n.raceId === raceId
    );
    if (timeObj.length > 0) {
      return Number(timeObj[0].time);
    }
    return 0;
  }
  _updateRaceId(raceId) {
    let raceSwimmers = this.props.swimmers.filter((n) => n.raceIds.includes(raceId));
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
    this._updateRaceId(1);
  }
  render() {
    let raceSwimmers = this.state.raceSwimmers.filter((swimmer) => isSwimmerRanked(swimmer, this.props.schools));
    let allSwimmers = this.props.swimmers.filter(
      (swimmer) => isSwimmerRanked(swimmer, this.props.schools)
    );
    let rankedSchools = this.props.schools.filter((n) => n.isRanked);
    let formHidden = this.props.location.pathname !== '/';
    return (
      <section>
        <nav className="ui top attached tabular menu">
          <Link to='/'
                className={classNames('item', {'active':this.state.activeLinkIndex===0})}
                onClick={() => { this._setActiveLink(0); }}>
            Ranking wg kategorii
          </Link>
          <Link to='/general-ranking-swimmers'
                className={classNames('item', {'active':this.state.activeLinkIndex===1})}
                onClick={() => { this._setActiveLink(1); }}>
            Ranking ogólny zawodników
          </Link>
          <Link to='/general-ranking-schools'
                className={classNames('item', {'active':this.state.activeLinkIndex===2})}
                onClick={() => { this._setActiveLink(2); }}>
            Ranking ogólny szkół
          </Link>
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
            swimmers: allSwimmers,
            isGeneral: true
          })}
        </section>
      </section>
    );
  }
}

GeneralRankings.propTypes = {
  swimmers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  schools: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

GeneralRankings.defaultProps = {
  swimmers: [],
  schools: []
};

export default GeneralRankings;
