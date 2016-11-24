import React, {Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import styles from'./Nav.stylesheet.css';

class Nav extends Component {
  render() {
    return (
      <div className={classNames(styles.NavWrapper, 'uk-width-1-10')}>
        <ul className={classNames("uk-nav", styles.Nav)}>
          <li className='uk-margin-large-bottom'>
            <Link to='/' className={styles.Nav__link}>
              <div className='uk-text-center'>
                <i className="uk-icon-home uk-icon-large"></i>
              </div>
              <div className='uk-text-center'>
                ZAWODY
              </div>
            </Link>
          </li>
          <li className='uk-margin-large-bottom'>
            <Link to='/schools' className={styles.Nav__link}>
              <div className='uk-text-center'>
                <i className="uk-icon-building uk-icon-large"></i>
              </div>
              <div className='uk-text-center'>
                SZKOŁY
              </div>
            </Link>
          </li>
          <li className='uk-margin-large-bottom'>
            <Link to='/swimmers' className={styles.Nav__link}>
              <div className='uk-text-center'>
                <i className="uk-icon-group uk-icon-large"></i>
              </div>
              <div className='uk-text-center'>
                ZAWODNICY
              </div>
            </Link>
          </li>
          <li className='uk-margin-large-bottom'>
            <Link to='/times' className={styles.Nav__link}>
              <div className='uk-text-center'>
                <i className="uk-icon-clock-o uk-icon-large"></i>
              </div>
              <div className='uk-text-center'>
                WYNIKI
              </div>
            </Link>
          </li>
          <li>
            <Link to='/classifications' className={styles.Nav__link}>
              <div className='uk-text-center'>
                <i className="uk-icon-trophy uk-icon-large"></i>
              </div>
              <div className='uk-text-center'>
                KLASYFIKACJE
              </div>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Nav;
