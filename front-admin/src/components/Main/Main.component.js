import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav.component';

class Main extends Component {
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    )
  }
}

export default Main;
