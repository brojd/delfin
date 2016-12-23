import React, {Component, PropTypes} from 'react';
import ChooseRace from '../../components/ChooseRace/ChooseRace.component';
import ClassificationSwimmersList from '../ClassificationSwimmersList/ClassificationSwimmersList.component';
import GeneralRankingByRace from '../GeneralRankingByRace/GeneralRankingByRace.component';
import ClassificationSchoolsList from '../ClassificationSchoolsList/ClassificationSchoolsList.component';
import getRaceIdByCategory from '../../helpers/getRaceIdByCategory';
import isSwimmerRanked from '../../helpers/isSwimmerRanked';

class GeneralRankings extends Component {
  constructor() {
    super();
    this._getCategory = this._getCategory.bind(this);
    this._updateRaceId = this._updateRaceId.bind(this);
    this._getRaceTime = this._getRaceTime.bind(this);
    this.state = {
      raceId: '',
      raceSwimmers: []
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
  componentDidMount() {
    let raceSwimmers = this.props.swimmers.filter((n) => n.raceIds.includes(this.state.raceId));
    let sortedSwimmers = raceSwimmers.sort((a, b) =>
      this._getRaceTime(a, this.state.raceId) - this._getRaceTime(b, this.state.raceId)
    );
    this.setState({
      raceSwimmers: sortedSwimmers
    });
  }
  render() {
    let raceSwimmers = this.state.raceSwimmers.filter((swimmer) => isSwimmerRanked(swimmer, this.props.schools));
    let allSwimmers = this.props.swimmers.filter(
      (swimmer) => isSwimmerRanked(swimmer, this.props.schools)
    );
    let rankedSchools = this.props.schools.filter((n) => n.isRanked);
    return (
      <div>
        <h3 className=''>Klasyfikacja wg kategorii</h3>
        <ChooseRace getCategory={this._getCategory}/>
        <GeneralRankingByRace swimmers={raceSwimmers}
                              raceId={this.state.raceId}
                              schools={this.props.schools} />
        <h3 className=''>Klasyfikacja ogólna zawodników</h3>
        <ClassificationSwimmersList schools={this.props.schools}
                                    swimmers={allSwimmers}
                                    isGeneral={true} />
        <h3 className=''>Klasyfikacja ogólna szkół</h3>
        <ClassificationSchoolsList schools={rankedSchools}
                                   swimmers={allSwimmers}
                                   isGeneral={true} />
      </div>
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
