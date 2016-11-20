import React, {Component, PropTypes} from 'react';
import SwimmerEditForm from '../../components/SwimmerEditForm/SwimmerEditForm.component';
import axios from 'axios';
import CONFIG from '../../config';
import _findIndex from 'lodash/findIndex';

class SwimmerList extends Component {
  constructor() {
    super();
    this._handleDelete = this._handleDelete.bind(this);
    this._displayEditForm = this._displayEditForm.bind(this);
    this._saveSwimmer = this._saveSwimmer.bind(this);
    this.state = {
      editFormVisible: false,
      swimmers: []
    };
  }
  _handleDelete(e, id) {
    this.props.deleteSwimmer(id);
  }
  _displayEditForm(e, id) {
    this.setState({
      editFormVisible: true,
      clickedSwimmerId: id
    });
  }
  _saveSwimmer(name, surname) {
    let swimmerToSave = {
      name: name,
      surname: surname
    };
    axios.put(`${CONFIG.API_URL}/swimmers/${this.state.clickedSwimmerId}`, swimmerToSave)
      .then((response) => {
        let currentSwimmers = this.state.swimmers;
        let swimmerIndex = _findIndex(currentSwimmers, (n) => n.id == this.state.clickedSwimmerId);
        currentSwimmers[swimmerIndex] = response.data;
        this.setState({ swimmers: currentSwimmers });
      })
      .catch((error) => console.error(error));
    console.log(name, surname);
  }
  componentDidMount() {
    this.setState({
      swimmers: this.props.swimmers
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      swimmers: nextProps.swimmers
    });
  }
  render() {
    let clickedSwimmer = this.props.swimmers.filter((n) => n.id == this.state.clickedSwimmerId)[0];
    return (
      <div>
        <ol>
          {this.state.swimmers.map((n, i) =>
            <li key={i}>
              {n.name} {n.surname}
              <i onClick={(e, id) => this._displayEditForm(e, n.id)} className="uk-icon-pencil uk-margin-left"></i>
              <i onClick={(e, id) => this._handleDelete(e, n.id)} className="uk-icon-trash uk-margin-small-left"></i>
            </li>
          )}
        </ol>
        <SwimmerEditForm editFormVisible={this.state.editFormVisible}
                         clickedSwimmer={clickedSwimmer}
                         saveSwimmer={this._saveSwimmer} />
      </div>
    );
  }
}

SwimmerList.propTypes = {
  deleteSwimmer: PropTypes.func,
  swimmers: PropTypes.array
};

export default SwimmerList;
