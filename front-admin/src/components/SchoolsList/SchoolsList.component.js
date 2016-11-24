import React, {Component, PropTypes} from 'react';
import SchoolEditForm from '../../components/SchoolEditForm/SchoolEditForm.component';
import axios from 'axios';
import CONFIG from '../../config';
import _findIndex from 'lodash/findIndex';

class SchoolList extends Component {
  constructor() {
    super();
    this._handleDelete = this._handleDelete.bind(this);
    this._displayEditForm = this._displayEditForm.bind(this);
    this._saveSchool = this._saveSchool.bind(this);
    this.state = {
      editFormVisible: false,
      schools: []
    };
  }
  _handleDelete(e, id) {
    this.props.deleteSchool(id);
  }
  _displayEditForm(e, id) {
    this.setState({
      editFormVisible: true,
      clickedSchoolId: id
    });
  }
  _saveSchool(name, surname) {
    let schoolToSave = {
      name: name
    };
    axios.put(`${CONFIG.API_URL}/schools/${this.state.clickedSchoolId}`, schoolToSave)
      .then((response) => {
        let currentSchools = this.state.schools;
        let schoolIndex = _findIndex(currentSchools, (n) => n.id == this.state.clickedSchoolId);
        currentSchools[schoolIndex] = response.data;
        this.setState({ schools: currentSchools });
      })
      .catch((error) => console.error(error));
  }
  componentDidMount() {
    this.setState({
      schools: this.props.schools
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      schools: nextProps.schools
    });
  }
  render() {
    let clickedSchool = this.props.schools.filter((n) => n.id == this.state.clickedSchoolId)[0];
    return (
      <div>
        <ol>
          {this.state.schools.map((n, i) =>
            <li key={i}>
              {n.name} {n.surname}
              <i onClick={(e, id) => this._displayEditForm(e, n.id)} className="uk-icon-pencil uk-margin-left"></i>
              <i onClick={(e, id) => this._handleDelete(e, n.id)} className="uk-icon-trash uk-margin-small-left"></i>
            </li>
          )}
        </ol>
        <SchoolEditForm editFormVisible={this.state.editFormVisible}
                         clickedSchool={clickedSchool}
                         saveSchool={this._saveSchool} />
      </div>
    );
  }
}

SchoolList.propTypes = {
  deleteSchool: PropTypes.func,
  schools: PropTypes.array
};

export default SchoolList;
