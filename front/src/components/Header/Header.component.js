import React, {Component} from 'react';
import logo from '../../images/logo.png';
import styles from './Header.stylesheet.css';

class App extends Component {
  render() {
    return (
      <header className={styles.Header}>
        <img src={logo}
             alt='logo'
             className={styles.Header_logo} />
        <span className={styles.Header_title}>SZKOLNA LIGA PŁYWACKA 2016/2017</span>
      </header>
    );
  }
}

export default App;
