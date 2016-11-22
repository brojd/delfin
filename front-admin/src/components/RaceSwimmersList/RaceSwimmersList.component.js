import React, {Component} from 'react';

class RaceSwimmersList extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.swimmers);
    return (
      <ul>
        {this.props.swimmers.map((swimmer, i) => (
          <li key={i}>{swimmer.name} {swimmer.surname}</li>
        ))}
      </ul>
    );
  }
}

export default RaceSwimmersList;
