import React, {Component} from 'react';
import Nav from '../Nav/Nav.component';
import classNames from 'classnames';
import styles from './Main.stylesheet.css';

class Main extends Component {
  render() {
    return (
      <main className={classNames('ui one column center aligned grid', styles.Main)}>
        <div className='ten wide column'>
          <Nav competitions={this.props.competitions} />
        </div>
      </main>
    );
  }
}

export default Main;
