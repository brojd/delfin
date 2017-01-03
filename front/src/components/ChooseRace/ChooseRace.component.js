import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import styles from './ChooseRace.stylesheet.css';

class ChooseRace extends Component {
  constructor() {
    super();
    this._handleSexChange = this._handleSexChange.bind(this);
    this._handleStyleChange = this._handleStyleChange.bind(this);
    this._handleAgeChange = this._handleAgeChange.bind(this);
    this.sexOptions = [
      { value: 'P1', label: 'Mężczyźni' },
      { value: 'P2', label: 'Kobiety' }
    ];
    this.styleOptions = [
      { value: 'S1', label: 'Dowolny' },
      { value: 'S2', label: 'Grzbietowy' },
      { value: 'S3', label: 'Klasyczny' }
    ];
    this.ageOptions = [
      { value: 'W1', label: 'Klasy 1-2' },
      { value: 'W2', label: 'Klasy 3-4' },
      { value: 'W3', label: 'Klasy 5-6' }
    ];
    this.state = {
      sex: { value: 'P1', label: 'Mężczyźni' },
      style: { value: 'S1', label: 'Dowolny' },
      age: { value: 'W1', label: 'Klasy 1-2' }
    };
  }
  _handleSexChange(val) {
    this.setState({ sex: val });
    this.props.getCategory(val, this.state.style, this.state.age);
  }
  _handleStyleChange(val) {
    this.setState({ style: val });
    this.props.getCategory(this.state.sex, val, this.state.age);
  }
  _handleAgeChange(val) {
    this.setState({ age: val });
    this.props.getCategory(this.state.sex, this.state.style, val);
  }
  componentDidMount() {
    this.props.getCategory(this.state.sex, this.state.style, this.state.age);
  }
  render() {
    return (
      <div className={styles.ChooseRaceWrapper}>
        <form className={classNames(styles.ChooseRace, 'ui three column grid')}>
          <div className={classNames('column')}>
            <Select
              name='sex'
              value={this.state.sex}
              options={this.sexOptions}
              onChange={this._handleSexChange}
              searchable={false}
              clearable={false}/>
          </div>
          <div className={classNames('column')}>
            <Select
              name='style'
              value={this.state.style}
              options={this.styleOptions}
              onChange={this._handleStyleChange}
              searchable={false}
              clearable={false}/>
          </div>
          <div className={classNames('column')}>
            <Select
              name='age'
              value={this.state.age}
              options={this.ageOptions}
              onChange={this._handleAgeChange}
              searchable={false}
              clearable={false}/>
          </div>
        </form>
      </div>
    );
  }
}

ChooseRace.propTypes = {
  getCategory: PropTypes.func
};

export default ChooseRace;
