import React, {Component} from 'react';
import Header from './components/Header/Header.component';
import OuterMain from './components/Main/OuterMain.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <OuterMain />
      </div>
    );
  }
}

export default App;
