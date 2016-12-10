import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from'./SchoolEditForm.stylesheet.css';

class SchoolEditForm extends Component {
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
    this.props.saveSchool(this.state.name);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.clickedSchool.name
    });
  }
  render() {
    return (
      <form className={classNames('uk-width-2-10 uk-form', styles.EditForm,
                      {[styles.visible]: this.props.editFormVisible}, {[styles.hidden]: !this.props.editFormVisible})}>
        <h5>Edytuj szkołę</h5>
        <div>
          Nazwa szkoły:
          <input type='text'
                 name='name'
                 value={this.state.name}
                 onChange={this._handleNameChange} />
        </div>
        <div>
          {this.state.name}
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
  saveSchool: PropTypes.func,
  editFormVisible: PropTypes.bool,
  clickedSchool: PropTypes.object
};

SchoolEditForm.defaultProps = {
  clickedSchool: {
    name: ''
  }
};

export default SchoolEditForm;
