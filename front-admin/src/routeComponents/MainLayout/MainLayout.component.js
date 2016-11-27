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
    this._setHeaderText = this._setHeaderText.bind(this);
    this.state = {
      competitions: [],
      headerText: ''
    }
  }
  _passCompetitionId(id) {
    this.setState({ currentCompetitionId: id });
    this._setHeaderText(id);
  }
  _getCurrentCompetition(id, array) {
    return array.filter((n) => n.id == id)[0];
  }
  _setHeaderText(competitionId) {
    let schoolsRouteString = new RegExp('schools');
    let swimmersRouteString = new RegExp('swimmers');
    let currentCompetition = this._getCurrentCompetition(competitionId, this.state.competitions);
    if (schoolsRouteString.test(window.location.hash)) {
      this.setState({ headerText: 'Szkoły'});
    } else if (swimmersRouteString.test(window.location.hash)) {
      this.setState({ headerText: 'Zawodnicy'});
    } else {
      this.setState({ headerText: currentCompetition.name});
    }
  }
  componentDidMount() {
    axios.get(`${CONFIG.API_URL}/competitions`)
      .then((response) => {
        this.setState({competitions: response.data});
        this._setHeaderText(this.state.currentCompetitionId);
      })
      .catch((error) => console.error(error))
    if (!localStorage.getItem('currentCompetitionId')) {
      localStorage.setItem('currentCompetitionId', CONFIG.DEFAULT_COMPETITION_ID);
      this.setState({currentCompetitionId: CONFIG.DEFAULT_COMPETITION_ID})
    } else {
      this.setState({currentCompetitionId: localStorage.getItem('currentCompetitionId')});
    }
  }
  componentWillReceiveProps() {
    this._setHeaderText(this.state.currentCompetitionId);
  }
  render() {
    return (
      <div className={classNames(styles.MainLayout)}>
        <Header textToDisplay={this.state.headerText} />
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
