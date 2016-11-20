import React, {Component, PropTypes} from 'react';

class SwimmerForm extends Component {
  constructor() {
    super();
    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleSurnameChange = this._handleSurnameChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      name: '',
      surname: ''
    };
  }
  _handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  _handleSurnameChange(e) {
    this.setState({ surname: e.target.value });
  }
  _handleSubmit(e) {
    e.preventDefault();
    this.props.addSwimmer(this.state.name, this.state.surname);
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

export default SwimmerForm;
