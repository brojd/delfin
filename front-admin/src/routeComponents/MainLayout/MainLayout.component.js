import React, {Component} from 'react';
import classNames from 'classnames';
import styles from './MainLayout.stylsheet.css';
import Header from '../../components/Header/Header.component';
import Nav from '../../components/Nav/Nav.component';
import CONFIG from '../../config';
import axios from 'axios';

class MainLayout extends Component {
  constructor() {
    super();
    this._passCompetitionId = this._passCompetitionId.bind(this);
    this._getCurrentCompetition = this._getCurrentCompetition.bind(this);
    this.state = {
      competitions: []
    }
  }
  _passCompetitionId(id) {
    this.setState({ currentCompetitionId: id });
  }
  _getCurrentCompetition(id, array) {
    return array.filter((n) => n.id == id)[0];
  }
  componentDidMount() {
    axios.get(`${CONFIG.API_URL}/competitions`)
      .then((response) => this.setState({competitions: response.data}))
      .catch((error) => console.error(error))
    if (!localStorage.getItem('currentCompetitionId')) {
      localStorage.setItem('currentCompetitionId', CONFIG.DEFAULT_COMPETITION_ID);
      this.setState({currentCompetitionId: CONFIG.DEFAULT_COMPETITION_ID})
    } else {
      this.setState({currentCompetitionId: localStorage.getItem('currentCompetitionId')});
    }
  }

  render() {
    let currentCompetition = this._getCurrentCompetition(this.state.currentCompetitionId, this.state.competitions);
    return (
      <div className={classNames(styles.MainLayout)}>
        <Header currentCompetition={currentCompetition} />
        <Nav/>
        {this.props.children && React.cloneElement(this.props.children, {
          passCompetitionId: this._passCompetitionId,
          competitions: this.state.competitions,
          currentCompetitionId: this.state.currentCompetitionId
        })}
      </div>
    )
  }
}

export default MainLayout;
