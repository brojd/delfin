import React, {Component} from 'react';
import SwimmerForm from '../../components/SwimmerForm/SwimmerForm.component';
import SwimmersList from '../../components/SwimmersList/SwimmersList.component';
import axios from 'axios';
import CONFIG from '../../config';
import _remove from 'lodash/remove';

class Nav extends Component {
  constructor() {
    super();
    this._addSwimmer = this._addSwimmer.bind(this);
    this._deleteSwimmer = this._deleteSwimmer.bind(this);
    this.state = {
      swimmers: []
    };
  }
  _addSwimmer(name, surname) {
    let swimmerToAdd = {
      name: name,
      surname: surname,
      competitionId: this.props.currentCompetitionId
    };
    axios.post(`${CONFIG.API_URL}/swimmers`, swimmerToAdd)
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
  componentDidMount() {
    axios.get(`${CONFIG.API_URL}/competitions/${localStorage.getItem('currentCompetitionId')}/swimmers`)
      .then((response) => this.setState({ swimmers: response.data }))
      .catch((error) => console.error(error));
  }
  render() {
    return (
      <div>
        <SwimmerForm addSwimmer={this._addSwimmer} />
        <SwimmersList swimmers={this.state.swimmers}
                      deleteSwimmer={this._deleteSwimmer} />
      </div>
    );
  }
}

export default Nav;
