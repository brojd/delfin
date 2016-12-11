import React, {Component} from 'react';
import auth from '../../auth';

class Logout extends Component {
  componentDidMount() {
    auth.logout();
  }
  render() {
    return <p>Zostałeś wylogowany</p>;
  }
}

export default Logout;
