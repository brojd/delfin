import React, {PropTypes} from 'react';
import getRaceTimeInCompetition from '../../helpers/getRaceTimeInCompetition';
import getRacePlaceInCompetition from '../../helpers/getRacePlaceInCompetition';
import getRacePointsInCompetition from '../../helpers/getRacePointsInCompetition';
import getSchoolNameById from '../../helpers/getSchoolNameById';
import styles from './ClassificationSwimmersListByRace.stylesheet.css';

const ClassificationSwimmersListByRace = ({ raceSwimmers, raceId, competitionId, schools }) => {
  return (
    <section className={styles.ClassificationSwimmersListByRace}>
      <div className='ui one column grid center aligned'>
        <div className='fourteen wide column'>
          <table className='ui striped compact table'>
            <thead>
            <tr>
              <th className='center aligned two wide column'>
                <span className={styles.th_name}>Miejsce</span>
              </th>
              <th className='five wide column'>
                <span className={styles.th_name}>Imię i nazwisko</span>
              </th>
              <th className='five wide column'>
                <span className={styles.th_name}>Szkoła</span>
              </th>
              <th className='center aligned two wide column'>
                <span className={styles.th_name}>Czas</span>
              </th>
              <th className='center aligned two wide column'>
                <span className={styles.th_name}>Punkty</span>
              </th>
            </tr>
            </thead>
            <tbody>
            {raceSwimmers.map((n, i) => (
              <tr key={i}>
                <td className='center aligned'>
                  {getRacePlaceInCompetition(n, raceId, competitionId)}
                </td>
                <td>
                  {n.name} {n.surname}
                </td>
                <td>
                  {getSchoolNameById(schools, n.schoolId)}
                </td>
                <td className='center aligned'>
                  {getRaceTimeInCompetition(n, raceId, competitionId)} sek
                </td>
                <td className='center aligned'>
                  {getRacePointsInCompetition(n, raceId, competitionId)} pkt
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

ClassificationSwimmersListByRace.propTypes = {
  raceSwimmers: PropTypes.array,
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
