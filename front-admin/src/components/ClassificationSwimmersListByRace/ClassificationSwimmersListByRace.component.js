import React, {Component, PropTypes} from 'react';
import getRaceTimeInCompetition from '../../helpers/getRaceTimeInCompetition';
import getRacePlaceInCompetition from '../../helpers/getRacePlaceInCompetition';
import getRacePointsInCompetition from '../../helpers/getRacePointsInCompetition';
import getSchoolNameById from '../../helpers/getSchoolNameById';

class ClassificationSwimmersListByRace extends Component {
  constructor() {
    super();
    this.state = {
      sortedSwimmers: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      sortedSwimmers: nextProps.swimmers,
      schools: nextProps.schools
    });
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.sortedSwimmers.map((n, i) => (
            <li key={i}>
              {getRacePlaceInCompetition(n, this.props.raceId, this.props.competitionId)} {n.name} {n.surname}
              ({getSchoolNameById(this.state.schools, n.schoolId)})
              {getRaceTimeInCompetition(n, this.props.raceId, this.props.competitionId)}s
              {getRacePointsInCompetition(n, this.props.raceId, this.props.competitionId)} points
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ClassificationSwimmersListByRace.propTypes = {
  swimmers: PropTypes.array,
  schools: PropTypes.array,
  raceId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  competitionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default ClassificationSwimmersListByRace;
