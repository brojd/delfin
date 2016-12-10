import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import CONFIG from '../../config';

class CompetitionSettings extends Component {
  constructor() {
    super();
    this._handleSave = this._handleSave.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._getPoints = this._getPoints.bind(this);
    this.state = {};
  }
  _handleSave() {
    let competitionToSave = this.props.currentCompetition;
    competitionToSave.ranks = this.state.ranks;
    axios.put(`${CONFIG.API_URL}/competitions/${competitionToSave.id}`, competitionToSave)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }
  _handleChange(e, n) {
    let objToSave = {};
    let ranks = this.state.ranks;
    objToSave['points'] = e.target.value;
    ranks[n] = objToSave;
    this.setState({ ranks: ranks });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentCompetition) {
      this.setState({ ranks: nextProps.currentCompetition.ranks });
    }
  }
  _getPoints(place) {
    if (this.state.ranks) {
      return this.state.ranks[place].points;
    } else {
      return '';
    }
  }
  render() {
    let nbOfDifferentRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return (
      <div>
         <h4>Punktacja</h4>
        <form>
          {nbOfDifferentRanks.map((n, i) => (
            <div key={i}>
              <span className='uk-margin-right'>Miejsce {n}</span>
              Punkty: <input type='number'
                             onChange={(e) => this._handleChange(e, n)}
                             value={this._getPoints(n)} />
            </div>
          ))}
          <button className='uk-button'
                  type='click'
                  onClick={this._handleSave}>
            Zapisz
          </button>
        </form>
      </div>
    );
  }
}

CompetitionSettings.propTypes = {
  currentCompetition: PropTypes.object
};

export default CompetitionSettings;
