import React, {Component, PropTypes} from 'react';

class SwimmerForm extends Component {
  constructor() {
    super();
    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleSurnameChange = this._handleSurnameChange.bind(this);
    this._handleSelectChange = this._handleSelectChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      name: '',
      surname: '',
      schoolId: ''
    };
  }
  _handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  _handleSurnameChange(e) {
    this.setState({ surname: e.target.value });
  }
  _handleSelectChange(e) {
    this.setState({ schoolId: e.target.value });
  }
  _handleSubmit(e) {
    e.preventDefault();
    this.props.addSwimmer(this.state.name, this.state.surname, this.state.schoolId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.schools.length > 0) {
      this.setState({ schoolId: nextProps.schools[0].id })
    }
  }
  render() {
    return (
      <form className='uk-width-2-10 uk-form'>
        <div>
          Imię: <input type='text'
                       name='name'
                       onChange={this._handleNameChange} />
        </div>
        <div>
          Nazwisko: <input type='text'
                          name='surname'
                          onChange={this._handleSurnameChange} />
        </div>
        <div>
          Szkoła:
          <select value={this.state.selectValue} onChange={this._handleSelectChange}>
            {this.props.schools.map((n, i) => {
              return (
                <option key={i} value={n.id}>{n.name}</option>
              )
            })}
          </select>
        </div>
        <div>
          {this.state.name} {this.state.surname}
        </div>
        <div>
          <button className='uk-button'
                  type='submit'
                  onClick={this._handleSubmit}>
            Dodaj zawodnika
          </button>
        </div>
      </form>
    );
  }
}

SwimmerForm.propTypes = {
  addSwimmer: PropTypes.func
};

SwimmerForm.defaultProps = {
  schools: []
};

export default SwimmerForm;
