import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './ChooseCompetition.stylesheet.css';

const ChooseCompetition = ({ competitions, currentCompetitionId, setCurrentCompetition, competitionChanged }) => {

  const isChosen = (competitionId) => currentCompetitionId == competitionId;
  const displayDate = (date) => {
    let dateToReturn = new Date(date);
    return dateToReturn.toLocaleDateString();
  };

  return (
    <ul className='uk-list uk-margin-large-top'>
      {competitions.map((competition, i) => {
        return (
          <li className={classNames(styles.competitionListElem, {[styles.chosen]: isChosen(competition.id)})}
              key={i}>
            <h3 className={styles.competitionListElem__date}>{displayDate(competition.date)}</h3>
            <div className={styles.competitionListElem__name}>{competition.name}</div>
            <button className='uk-button'
                    onClick={(e) => {
                      setCurrentCompetition(e, competition.id);
                      competitionChanged(e, competition.id);
                    }}>
              Wybierz
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ChooseCompetition.propTypes = {
  competitions: PropTypes.array,
  currentCompetitionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  setCurrentCompetition: PropTypes.func,
  competitionChanged: PropTypes.func
};

export default ChooseCompetition;
