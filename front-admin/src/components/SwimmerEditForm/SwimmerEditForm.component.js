import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from'./SwimmerEditForm.stylesheet.css';

class SwimmerEditForm extends Component {
  constructor() {
    super();
    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleSurnameChange = this._handleSurnameChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleSelectChange = this._handleSelectChange.bind(this);
    this.state = {
      formVisible: false,
      currentSwimmer: {}
    };
  }
  _handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  _handleSurnameChange(e) {
    this.setState({ surname: e.target.value });
  }
  _handleSelectChange(e) {
    console.log(this.state.selectValue);
    this.setState({ schoolId: e.target.value });
  }
  _handleSubmit(e) {
    e.preventDefault();
    this.props.saveSwimmer(this.state.name, this.state.surname, this.state.schoolId);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      formVisible: nextProps.editFormVisible,
      currentSwimmer: nextProps.clickedSwimmer,
      name: nextProps.clickedSwimmer.name,
      surname: nextProps.clickedSwimmer.surname,
      schoolId: nextProps.clickedSwimmer.schoolId
    });
  }
  render() {
    return (
      <form className={classNames('uk-width-2-10 uk-form', styles.EditForm, {[styles.visible]: this.state.formVisible},
      {[styles.hidden]: !this.state.formVisible})}>
        <h5>Edytuj zawodnika</h5>
        <div>
          Imię: <input type='text'
                       name='name'
                       value={this.state.name}
                       onChange={this._handleNameChange} />
        </div>
        <div>
          Nazwisko: <input type='text'
                           name='surname'
                           value={this.state.surname}
                           onChange={this._handleSurnameChange} />
        </div>
        <div>
          {this.state.name} {this.state.surname}
        </div>
        <div>
          Szkoła:
          <select value={this.state.schoolId} onChange={this._handleSelectChange}>
            {this.props.schools.map((n, i) => {
              return (
                <option key={i} value={n.id}>{n.name}</option>
              )
            })}
          </select>
        </div>
        <div>
          <button className='uk-button'
                  type='submit'
                  onClick={this._handleSubmit}>
            Zapisz
          </button>
        </div>
      </form>
    );
  }
}

SwimmerEditForm.propTypes = {
  saveSwimmer: PropTypes.func
};

SwimmerEditForm.defaultProps = {
  clickedSwimmer: {
    name: '',
    surname: ''
  }
};

export default SwimmerEditForm;
