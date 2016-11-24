import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from'./Header.stylesheet.css';

class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <header className={classNames(styles.Header, 'uk-width-9-10 uk-float-right uk-text-center')}>
        <h2 className={classNames(styles.Header__heading, 'uk-text-center')}>
          {this.props.currentCompetition.name}
        </h2>
      </header>
    )
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
