import React, {Component} from 'react';
import Header from './components/Header/Header.component';
import Footer from './components/Footer/Footer.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
