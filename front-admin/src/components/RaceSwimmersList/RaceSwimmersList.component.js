import React, {Component} from 'react';

class RaceSwimmersList extends Component {
  constructor() {
    super();
    this._handleDelete = this._handleDelete.bind(this);
    this._handleSaveTime = this._handleSaveTime.bind(this);
    this._getRaceTime = this._getRaceTime.bind(this);
    this._handleTimeChange = this._handleTimeChange.bind(this);
    this._getCurrentSchoolName = this._getCurrentSchoolName.bind(this);
    this.state = {
      swimmers: [],
      schools: []
    };
  }
  _handleDelete(e, id) {
    this.props.deleteSwimmer(id);
  }
  _handleSaveTime(e, swimmerId) {
    this.props.saveTime(e.target.value, swimmerId);
  }
  _getRaceTime(swimmer, raceId) {
    let timeObj = swimmer.times.filter((n) => n.raceId === raceId);
    if (timeObj.length > 0) {
      return Number(timeObj[0].time);
    }
    return '';
  }
  _handleTimeChange(e, swimmerId) {
    let swimmers = this.state.swimmers;
    let swimmerIndex;
    let swimmerToChange = swimmers.filter((n, i) => {
      if (n.id == swimmerId) {
        swimmerIndex = i;
      }
      return n.id == swimmerId;
    })[0];
    swimmerToChange['time'] = e.target.value;
    swimmers[swimmerIndex] = swimmerToChange;
    this.setState({ swimmers: swimmers });
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
    let swimmers = this.props.swimmers;
    if (swimmers.length > 0) {
      swimmers.forEach((n) => {
        n.time = this._getRaceTime(n, this.props.raceId);
      });
    }
    this.setState({ swimmers: swimmers });
  }
  componentWillReceiveProps(nextProps) {
    let swimmers = nextProps.swimmers;
    if (swimmers.length > 0) {
      swimmers.forEach((n) => {
        n.time = this._getRaceTime(n, nextProps.raceId);
      });
    }
    this.setState({ swimmers: swimmers });
  }
  render() {
    return (
      <ol>
        {this.state.swimmers.map((swimmer, i) => (
          <li key={i}>
            {swimmer.name} {swimmer.surname} ({this._getCurrentSchoolName(swimmer.id)})
            <input type='number'
                   step='any'
                   onBlur={(e) => this._handleSaveTime(e, swimmer.id)}
                   onChange={(e) => this._handleTimeChange(e, swimmer.id)}
                   value={swimmer.time} />
            <i onClick={(e) => this._handleDelete(e, swimmer.id)}
               className="uk-icon-trash uk-margin-small-left">
            </i>
          </li>
        ))}
      </ol>
    );
  }
}

export default RaceSwimmersList;
