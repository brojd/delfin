import React, {Component} from 'react';
import {Link} from 'react-router';

class Nav extends Component {
  render() {
    return (
      <ul className="uk-nav">
        <li><Link to='/'>ZAWODY</Link></li>
        <li><Link to='/swimmers'>ZAWODNICY</Link></li>
        <li><Link to='/times'>WYNIKI</Link></li>
        <li><Link to='/classifications'>KLASYFIKACJE</Link></li>
      </ul>
    )
  }
}

export default Nav;
