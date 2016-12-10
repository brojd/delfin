import React, { PropTypes } from 'react';

const SwimmerList = ({ swimmers, deleteSwimmer, displayEditForm, schools }) => {

  let getCurrentSchoolName = (swimmerId) => {
    if (schools.length > 0) {
      let currentSwimmer = swimmers.filter((n) => n.id === swimmerId)[0];
      let currentSchool = schools.filter((n) => n.id === currentSwimmer.schoolId)[0];
      return currentSchool.name;
    }
    return null;
  };
  return (
    <div className='uk-margin-large-top'>
      <h2>Lista zawodników</h2>
      <ol>
        {swimmers.map((n, i) =><li key={i}>
            {n.name} {n.surname} ({getCurrentSchoolName(n.id)})
            <i onClick={() => displayEditForm(n.id)} className="uk-icon-pencil uk-margin-left"></i>
            <i onClick={() => deleteSwimmer(n.id)} className="uk-icon-trash uk-margin-small-left"></i>
          </li>
        )}
      </ol>
    </div>
  );
};

SwimmerList.propTypes = {
  deleteSwimmer: PropTypes.func,
  displayEditForm: PropTypes.func,
  swimmers: PropTypes.array,
  schools: PropTypes.array,
};

export default SwimmerList;
