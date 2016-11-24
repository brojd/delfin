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
    this._getCurrentSchoolName = this._getCurrentSchoolName.bind(this);
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
  _getCurrentSchoolName(swimmerId) {
    if (this.props.schools.length > 0) {
      let currentSwimmer = this.props.swimmers.filter((n) => n.id === swimmerId)[0];
      let currentSchool = this.props.schools.filter((n) => n.id === currentSwimmer.schoolId)[0];
      return currentSchool.name;
    }
    return null;
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
      <div className='uk-margin-large-top'>
        <h2>Lista zawodników</h2>
        <ol>
          {this.state.swimmers.map((n, i) =>
            <li key={i}>
              {n.name} {n.surname} ({this._getCurrentSchoolName(n.id)})
              <i onClick={(e, id) => this._displayEditForm(e, n.id)} className="uk-icon-pencil uk-margin-left"></i>
              <i onClick={(e, id) => this._handleDelete(e, n.id)} className="uk-icon-trash uk-margin-small-left"></i>
            </li>
          )}
        </ol>
        <SwimmerEditForm editFormVisible={this.state.editFormVisible}
                         clickedSwimmer={clickedSwimmer}
                         saveSwimmer={this._saveSwimmer}
                         schools={this.props.schools} />
      </div>
    );
  }
}

SwimmerList.propTypes = {
  deleteSwimmer: PropTypes.func,
  swimmers: PropTypes.array
};

SwimmerList.defaultProps = {
  schools: []
};

export default SwimmerList;
