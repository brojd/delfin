import React, {PropTypes} from 'react';

const SchoolList = ({ schools, deleteSchool, displayEditForm }) => {

  return (
    <div>
      <ol>
        {schools.map((n, i) =>
          <li key={i}>
            {n.name} {n.surname}
            <i onClick={() => displayEditForm(n.id)} className="uk-icon-pencil uk-margin-left"></i>
            <i onClick={() => deleteSchool(n.id)} className="uk-icon-trash uk-margin-small-left"></i>
          </li>
        )}
      </ol>
    </div>
  );
};

SchoolList.propTypes = {
  deleteSchool: PropTypes.func,
  displayEditForm: PropTypes.func,
  schools: PropTypes.array,
};

export default SchoolList;
