import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from'./SchoolEditForm.stylesheet.css';

class SchoolEditForm extends Component {
  constructor() {
    super();
    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      formVisible: false,
      currentSchool: {}
    };
  }
  _handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  _handleSubmit(e) {
    e.preventDefault();
    this.props.saveSchool(this.state.name);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      formVisible: nextProps.editFormVisible,
      currentSchool: nextProps.clickedSchool,
      name: nextProps.clickedSchool.name
    });
  }
  render() {
    return (
      <form className={classNames('uk-width-2-10 uk-form', styles.EditForm, {[styles.visible]: this.state.formVisible},
      {[styles.hidden]: !this.state.formVisible})}>
        <h5>Edytuj szkołę</h5>
        <div>
          Nazwa szkoły: <input type='text'
                       name='name'
                       value={this.state.name}
                       onChange={this._handleNameChange} />
        </div>
        <div>
          {this.state.name} {this.state.surname}
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

SchoolEditForm.propTypes = {
  saveSchool: PropTypes.func
};

SchoolEditForm.defaultProps = {
  clickedSchool: {
    name: ''
  }
};

export default SchoolEditForm;
