import React, {Component} from 'react';

class ClassificationSwimmersList extends Component {
  constructor() {
    super();
    this.state = {
      sortedSwimmers: []
    };
    this._getRaceTime = this._getRaceTime.bind(this);
  }
  _getRaceTime(swimmer, raceId) {
    let timeObj = swimmer.times.filter((n) => n.raceId === raceId);
    if (timeObj.length > 0) {
      return Number(timeObj[0].time);
    }
    return 'brak';
  }
  componentWillReceiveProps(nextProps) {
    let sortedSwimmers = nextProps.swimmers.sort((a, b) => a.time - b.time);
    this.setState({ sortedSwimmers: sortedSwimmers });
  }
  render() {
    return (
      <div>
        <ol>
          {this.state.sortedSwimmers.map((n, i) => (
            <li key={i}>{n.name} {n.surname} {this._getRaceTime(n, this.props.raceId)}s</li>
          ))}
        </ol>
        <button className='uk-button'>Przypisz punkty</button>
      </div>
    )
  }
}

export default ClassificationSwimmersList;
