import React, {Component} from 'react';

class RaceSwimmersList extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.swimmers);
    return (
      <ul>
        {this.props.swimmers.map((swimmer) => (
          <li>{swimmer.label}</li>
        ))}
      </ul>
    );
  }
}

export default RaceSwimmersList;
