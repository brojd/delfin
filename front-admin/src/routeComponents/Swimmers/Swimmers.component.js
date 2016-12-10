import React, {Component} from 'react';
import SwimmerForm from '../../components/SwimmerForm/SwimmerForm.component';
import SwimmersList from '../../components/SwimmersList/SwimmersList.component';
import SwimmerEditForm from '../../components/SwimmerEditForm/SwimmerEditForm.component';
import axios from 'axios';
import CONFIG from '../../config';
import _remove from 'lodash/remove';
import _findIndex from 'lodash/findIndex';

class Nav extends Component {
  constructor() {
    super();
    this._addSwimmer = this._addSwimmer.bind(this);
    this._deleteSwimmer = this._deleteSwimmer.bind(this);
    this._saveSwimmer = this._saveSwimmer.bind(this);
    this._displayEditForm = this._displayEditForm.bind(this);
    this.state = {
      swimmers: [],
      schools: [],
      editFormVisible: false
    };
  }
  _addSwimmer(name, surname, schoolId) {
    let swimmerToAdd = {
      name: name,
      surname: surname,
      times: []
    };
    axios.post(`${CONFIG.API_URL}/schools/${schoolId}/swimmers`, swimmerToAdd)
      .then((response) => {
        let currentSwimmers = this.state.swimmers;
        currentSwimmers.push(response.data);
        this.setState({ swimmers: currentSwimmers });
      })
      .catch((error) => console.error(error));
  }
  _deleteSwimmer(id) {
    axios.delete(`${CONFIG.API_URL}/swimmers/${id}`)
      .then((response) => {
        if (response.status === 200) {
          let currentSwimmers = this.state.swimmers;
          _remove(currentSwimmers, (n) => n.id == id);
          this.setState({ swimmers: currentSwimmers });
        }
      })
      .catch((error) => console.error(error));
  }
  _saveSwimmer(name, surname, schoolId) {
    let swimmerToSave = {
      name: name,
      surname: surname,
      schoolId: schoolId
    };
    axios.put(`${CONFIG.API_URL}/swimmers/${this.state.clickedSwimmerId}`, swimmerToSave)
      .then((response) => {
        let currentSwimmers = this.state.swimmers;
        let swimmerIndex = _findIndex(currentSwimmers, (n) => n.id == this.state.clickedSwimmerId);
        currentSwimmers[swimmerIndex] = response.data;
        this.setState({ swimmers: currentSwimmers });
      })
      .catch((error) => console.error(error));
  }
  _displayEditForm(id) {
    this.setState({
      editFormVisible: true,
      clickedSwimmerId: id
    });
  }
  componentDidMount() {
    axios.all([
      axios.get(`${CONFIG.API_URL}/swimmers`),
      axios.get(`${CONFIG.API_URL}/schools`)
    ])
      .then(axios.spread((swimmersRes, schoolsRes) => {
        this.setState({
          swimmers: swimmersRes.data,
          schools: schoolsRes.data
        });
      }))
      .catch((error) => console.error(error));
  }
  render() {
    let clickedSwimmer = this.state.swimmers.filter((n) => n.id == this.state.clickedSwimmerId)[0];
    return (
      <div>
        <SwimmerForm addSwimmer={this._addSwimmer}
                     schools={this.state.schools} />
        <h2>Lista zawodników</h2>
        <SwimmersList swimmers={this.state.swimmers}
                      deleteSwimmer={this._deleteSwimmer}
                      displayEditForm={this._displayEditForm}
                      schools={this.state.schools}
                      editable={true} />
        <SwimmerEditForm editFormVisible={this.state.editFormVisible}
                         clickedSwimmer={clickedSwimmer}
                         saveSwimmer={this._saveSwimmer}
                         schools={this.state.schools} />
      </div>
    );
  }
}

export default Nav;
