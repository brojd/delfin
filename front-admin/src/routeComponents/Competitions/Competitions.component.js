import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './Competitions.stylesheet.css';
import Select from 'react-select';
import axios from 'axios';
import CONFIG from '../../config';
import CompetitionSettings from '../../components/CompetitionSettings/CompetitionSettings.component';

class Competitions extends Component {
  constructor() {
    super();
    this._setCurrentCompetition = this._setCurrentCompetition.bind(this);
    this._handleSwimmerChosen = this._handleSwimmerChosen.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._displayDate = this._displayDate.bind(this);
    this._isChosen = this._isChosen.bind(this);
    this.state = {
      competitions: [],
      allSwimmers: [],
      competitionSwimmers: []
    };
  }
  _setCurrentCompetition(e, id) {
    let currentCompetition = this.state.competitions.filter((n) => n.id === id)[0];
    localStorage.setItem('currentCompetitionId', id);
    axios.get(`${CONFIG.API_URL}/competitions/${id}/swimmers`)
      .then((competitionSwimmers) => this.setState({ competitionSwimmers: competitionSwimmers.data,
        currentCompetition: currentCompetition }));
  }
  _displayDate(date) {
    let dateToReturn = new Date(date);
    return dateToReturn.toLocaleDateString();
  }
  _isChosen(competitionId) {
    return this.props.currentCompetitionId == competitionId;
  }
  _handleSwimmerChosen(val) {
    axios.head(`${CONFIG.API_URL}/competitions/${localStorage.getItem('currentCompetitionId')}/swimmers/rel/${val.value.id}`)
      .then((res) => {
        if (res.status === 200) {
          alert('Swimmer already added');
        }
      })
      .catch(() => {
        let competitionSwimmers = this.state.competitionSwimmers;
        competitionSwimmers.push(val.value);
        axios.put(`${CONFIG.API_URL}/competitions/${localStorage.getItem('currentCompetitionId')}/swimmers/rel/${val.value.id}`)
          .then(() => this.setState({ competitionSwimmers: competitionSwimmers }))
          .catch((err) => console.error(err));
      });
  }
  _handleDelete(e, id) {
    axios.delete(`${CONFIG.API_URL}/competitions/${localStorage.getItem('currentCompetitionId')}/swimmers/rel/${id}`)
      .then((res) => {
        if (res.status === 204) {
          let competitionSwimmers = this.state.competitionSwimmers.filter((n) => n.id !== id);
          this.setState({ competitionSwimmers: competitionSwimmers });
        }
      });
  }
  _getCurrentSchoolName(swimmerId) {
    if (this.state.allSwimmers.length > 0 && this.state.allSchools.length > 0) {
      let currentSwimmer = this.state.allSwimmers.filter((n) => n.id === swimmerId)[0];
      let currentSchool = this.state.allSchools.filter((n) => n.id === currentSwimmer.schoolId)[0];
      return currentSchool.name;
    }
    return null;
  }
  componentDidMount() {
    let currentCompetitionId = localStorage.getItem('currentCompetitionId');
    this.setState({ currentCompetitionId: currentCompetitionId });
    axios.all([
      axios.get(`${CONFIG.API_URL}/swimmers`),
      axios.get(`${CONFIG.API_URL}/competitions/${currentCompetitionId}/swimmers`),
      axios.get(`${CONFIG.API_URL}/schools`),
      axios.get(`${CONFIG.API_URL}/competitions`)
    ])
      .then(axios.spread((swimmersRes, competitionSwimmers, schoolsRes, competitionsRes) => {
        this.setState({
          allSwimmers: swimmersRes.data,
          competitionSwimmers: competitionSwimmers.data,
          allSchools: schoolsRes.data,
          competitions: competitionsRes.data,
          currentCompetition: competitionsRes.data.filter((n) => n.id === currentCompetitionId)[0]
        });
      }))
      .catch((error) => console.error(error));
  }
  render() {
    let swimmerChoices = this.state.allSwimmers.map((n) => {
      return {
        value: n,
        label: `${n.name} ${n.surname} (${this._getCurrentSchoolName(n.id)})`
      };
    });
    return (
      <div className={classNames('uk-align-center uk-width-9-10', styles.Competitions)}>
        <h3 className='uk-text-center '>
          Wybierz zawody
        </h3>
        <ul className='uk-list uk-margin-large-top'>
          {this.props.competitions.map((competition, i) => {
            return (
              <li className={classNames(styles.competitionListElem, {[styles.chosen]: this._isChosen(competition.id)})}
                  key={i}>
                <h3 className={styles.competitionListElem__date}>{this._displayDate(competition.date)}</h3>
                <div className={styles.competitionListElem__name}>{competition.name}</div>
                <button className='uk-button'
                        onClick={(e) => {
                          this._setCurrentCompetition(e, competition.id);
                          this.props.competitionChanged(e, competition.id);
                        }}>
                  Wybierz
                </button>
              </li>
            );
          })}
        </ul>
        <h3 className='uk-text-center '>
          Lista uczestników
        </h3>
        <Select
          name='swimmer'
          options={swimmerChoices}
          onChange={this._handleSwimmerChosen}
          className='uk-width-2-10 uk-display-inline-block uk-margin-large-right'
        />
        <ol>
          {this.state.competitionSwimmers.map((n, i) =>
            <li key={i}>
              {n.name} {n.surname} ({this._getCurrentSchoolName(n.id)})
              <i onClick={(e) => this._handleDelete(e, n.id)} className="uk-icon-trash uk-margin-small-left"></i>
            </li>
          )}
        </ol>
        <h3 className='uk-text-center '>
          Ustawienia zawodów
        </h3>
        <CompetitionSettings currentCompetition={this.state.currentCompetition} />
      </div>
    );
  }
}

Competitions.propTypes = {
  competitionChanged: PropTypes.func,
  competitions: PropTypes.array,
  currentCompetitionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default Competitions;
