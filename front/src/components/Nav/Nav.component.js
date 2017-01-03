import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './Nav.stylesheet.css';
import { Link } from 'react-router';

class Nav extends Component {
  constructor() {
    super();
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this._setActiveLink = this._setActiveLink.bind(this);
    this.state = {
      menuVisible: false,
      activeLinkIndex: 0
    };
  }
  showMenu() {
    this.setState({ menuVisible: true });
  }
  hideMenu() {
    this.setState({ menuVisible: false });
  }
  _setActiveLink(linkIndex) {
    this.setState({ activeLinkIndex: linkIndex });
  }
  render() {
    return (
      <section className={styles.NavWrapper}>
        <nav className={classNames('ui three column labeled icon grid menu', styles.Nav)}>
            <Link to='/'
                  className={classNames('item column', {[styles.activeLink]:this.state.activeLinkIndex===0}, styles.link)}
                  onClick={() => { this._setActiveLink(0); }}>
              <i className="trophy icon"></i>
              Klasyfikacja generalna
            </Link>
            <div className={classNames('ui simple dropdown item column', styles.link, {[styles.activeLink]:this.state.activeLinkIndex===1})}
                 onClick={() => { this._setActiveLink(1); }}>
              <i className="sitemap icon"></i>
              <span className="text">Wyniki zawodów <i className="dropdown icon"></i></span>
              <div className='menu'>
                {this.props.competitions.map((n, i) => (
                  <Link to={`competition/${n.id}`} key={i} className="item">
                    {n.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to='/records'
                  className={classNames('item column', styles.link, {[styles.activeLink]:this.state.activeLinkIndex===2})}
                  onClick={() => { this._setActiveLink(2); }}>
              <i className="flag checkered icon"></i>
              Rekordy
            </Link>
        </nav>
      </section>
    );
  }
}

Nav.propTypes = {
  competitions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Nav;
