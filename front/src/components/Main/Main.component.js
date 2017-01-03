import React, {Component, PropTypes} from 'react';
import Nav from '../Nav/Nav.component';
import classNames from 'classnames';
import styles from './Main.stylesheet.css';

class Main extends Component {
  render() {
    return (
      <div className={styles.MainWrapper}>
        <main className={classNames('ui one column center aligned grid', styles.Main)}>
          <div className='fourteen wide column'>
            <Nav competitions={this.props.competitions} />
          </div>
          <div className='twelve wide column'>
            {this.props.children && React.cloneElement(this.props.children, {
              schools: this.props.schools,
              swimmers: this.props.swimmers,
              competitions: this.props.competitions
            })}
          </div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  swimmers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  schools: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  competitions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Main;
