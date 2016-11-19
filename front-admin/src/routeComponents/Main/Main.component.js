import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

class Main extends Component {
  constructor() {
    super();
    this._competitionChanged = this._competitionChanged.bind(this);
    this.state = {};
  }
  _competitionChanged(e, id) {
    this.setState({ currentCompetitionId: id });
    this.props.passCompetitionId(id);
  }
  render() {
    return (
      <main className={classNames('uk-align-center uk-width-8-10')}>
        {this.props.children && React.cloneElement(this.props.children, {
          competitionChanged: this._competitionChanged,
          competitions: this.props.competitions,
          currentCompetitionId: this.props.currentCompetitionId
        })}
      </main>
    )
  }
}

Main.propTypes = {
  competitionChanged: PropTypes.func,
  competitions: PropTypes.array,
  currentCompetitionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default Main;
