import React, {Component} from 'react';

class RaceSwimmersList extends Component {
  constructor() {
    super();
    this._handleDelete = this._handleDelete.bind(this);
  }
  _handleDelete(e, id) {
    this.props.deleteSwimmer(id);
  }
  render() {
    console.log(this.props.swimmers);
    return (
      <ol>
        {this.props.swimmers.map((swimmer, i) => (
          <li key={i}>
            {swimmer.name} {swimmer.surname}
            <i onClick={(e) => this._handleDelete(e, swimmer.id)} className="uk-icon-trash uk-margin-small-left"></i>
          </li>
        ))}
      </ol>
    );
  }
}

export default RaceSwimmersList;
