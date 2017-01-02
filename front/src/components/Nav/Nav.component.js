import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './Nav.stylesheet.css';
import { Link } from 'react-router';

class Nav extends Component {
  constructor() {
    super();
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.state = {
      menuVisible: false
    };
  }
  showMenu() {
    this.setState({ menuVisible: true });
  }
  hideMenu() {
    this.setState({ menuVisible: false });
  }
  render() {
    return (
      <nav className={classNames('ui three column grid menu', styles.Nav)}>
        <Link to='/' className="item column">
          Klasyfikacja generalna
        </Link>
        <div className='ui simple dropdown item column'>
          <span className="text">Wyniki zawodów</span>
          <i className="dropdown icon"></i>
          <div className='menu'>
            <div className="header">Zawody</div>
            {this.props.competitions.map((n, i) => (
              <Link to={`competition/${n.id}`} key={i} className="item">{n.name} {n.date}</Link>
            ))}
          </div>
        </div>
        <Link to='/records' className="item column">
          Rekordy
        </Link>
      </nav>
    );
  }
}

Nav.propTypes = {
  competitions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Nav;
