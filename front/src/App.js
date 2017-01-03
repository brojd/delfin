import React, {Component} from 'react';
import styles from './App.stylesheet.css';
import Header from './components/Header/Header.component';
import Footer from './components/Footer/Footer.component';

class App extends Component {
  render() {
    return (
      <div>
        <div className={styles.pageWrap}>
          <Header />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
