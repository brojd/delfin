import React, {Component} from 'react';
import SchoolForm from '../../components/SchoolForm/SchoolForm.component';
import SchoolsList from '../../components/SchoolsList/SchoolsList.component';
import axios from 'axios';
import CONFIG from '../../config';
import _remove from 'lodash/remove';

class Schools extends Component {
  constructor() {
    super();
    this._addSchool = this._addSchool.bind(this);
    this._deleteSchool = this._deleteSchool.bind(this);
    this.state = {
      schools: []
    };
  }
  _addSchool(name) {
    let schoolToAdd = {
      name: name
    };
    axios.post(`${CONFIG.API_URL}/schools`, schoolToAdd)
      .then((response) => {
        let currentSchools = this.state.schools;
        currentSchools.push(response.data);
        this.setState({ schools: currentSchools });
      })
      .catch((error) => console.error(error));
  }
  _deleteSchool(id) {
    axios.delete(`${CONFIG.API_URL}/schools/${id}`)
      .then((response) => {
        if (response.status === 200) {
          let currentSchools = this.state.schools;
          _remove(currentSchools, (n) => n.id == id);
          this.setState({ schools: currentSchools });
        }
      })
      .catch((error) => console.error(error));
  }
  componentDidMount() {
    axios.get(`${CONFIG.API_URL}/schools`)
      .then((response) => this.setState({ schools: response.data }))
      .catch((error) => console.error(error));
  }
  render() {
    return (
      <div>
        <SchoolForm addSchool={this._addSchool} />
        <SchoolsList schools={this.state.schools}
                     deleteSchool={this._deleteSchool} />
      </div>
    );
  }
}

export default Schools;
