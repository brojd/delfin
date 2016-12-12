import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from'./Header.stylesheet.css';
import {Link} from 'react-router';
import auth from '../../auth';

class Header extends Component {
  constructor() {
    super();
    this._updateAuth = this._updateAuth.bind(this);
    this.state = {
      loggedIn: auth.loggedIn()
    };
  }
  _updateAuth(loggedIn) {
    this.setState({
      loggedIn
    });
  }
  componentWillMount() {
    auth.onChange = this._updateAuth;
    auth.login();
  }
  render() {
    return (
      <header className={classNames(styles.Header, 'uk-width-5-6 uk-float-right uk-text-center')}>
        {this.state.loggedIn ? (
          <Link to="/logout" className='uk-float-right'>Wyloguj się</Link>
        ) : (
          <Link to="/login" className='uk-float-right'>Zaloguj się</Link>
        )}
        <h2 className={classNames(styles.Header__heading, 'uk-text-center')}>
          {this.props.textToDisplay}
        </h2>
      </header>
    );
  }
}

Header.defaultProps = {
  currentCompetition: {
    name: 'Zawody'
  }
};

Header.propTypes = {
  currentCompetition: PropTypes.object
};

export default Header;
