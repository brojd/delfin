import React, {Component, PropTypes} from 'react';

class SchoolForm extends Component {
  constructor() {
    super();
    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      name: ''
    };
  }
  _handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  _handleSubmit(e) {
    e.preventDefault();
    this.props.addSchool(this.state.name);
  }
  render() {
    return (
      <form className='uk-width-2-10 uk-form'>
        <div>
          Nazwa szkoły: <input type='text'
                       name='name'
                       onChange={this._handleNameChange} />
        </div>
        <div>
          {this.state.name}
        </div>
        <div>
          <button className='uk-button'
                  type='submit'
                  onClick={this._handleSubmit}>
            Dodaj szkołę
          </button>
        </div>
      </form>
    );
  }
}

SchoolForm.propTypes = {
  addSchool: PropTypes.func
};

export default SchoolForm;
