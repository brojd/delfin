import React, {Component, PropTypes} from 'react';

class SchoolForm extends Component {
  constructor() {
    super();
    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleIsRankedChange = this._handleIsRankedChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      name: '',
      isRanked: true
    };
  }
  _handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  _handleIsRankedChange() {
    this.setState({ isRanked: !this.state.isRanked });
  }
  _handleSubmit(e) {
    e.preventDefault();
    this.props.addSchool(this.state.name, this.state.isRanked);
  }
  render() {
    return (
      <form className='uk-width-2-10 uk-form'>
        <div>
          Nazwa szkoły:
          <input type='text'
                 name='name'
                 onChange={this._handleNameChange} />
          <input type='checkbox'
                 name='isRanked'
                 onChange={this._handleIsRankedChange}
                 checked={this.state.isRanked} />
          Uwzględnij w klasyfikacji
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
