import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav.component';
import classNames from 'classnames';
import styles from './Main.stylsheet.css';

class Main extends Component {
  render() {
    return (
      <main className={classNames(styles.Main, 'uk-align-center uk-width-8-10')}>
        <Nav />
        {this.props.children}
      </main>
    )
  }
}

export default Main;
