import React, {Component} from 'react';
import auth from '../../auth';

class Login extends Component {
  constructor() {
    super();
    this._handleEmailChange = this._handleEmailChange.bind(this);
    this._handlePassChange = this._handlePassChange.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
    this.state = {
      email: '',
      pass: '',
      error: false
    };
  }
  _handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  _handlePassChange(e) {
    this.setState({ pass: e.target.value });
  }
  _handleLogin() {
    auth.login(this.state.email, this.state.pass, (loggedIn) => {
      if (loggedIn) {
        this.props.history.push('/');
      } else {
        this.setState({ error: true });
      }
    });
  }
  render() {
    let errorMessage = this.state.error ? <div>Error</div> : '';
    return (
      <div>
        E-mail: <input type='text'
                       value={this.state.email}
                       onChange={this._handleEmailChange} />
        Password <input type='password'
                        value={this.state.pass}
                        onChange={this._handlePassChange} />
        <button type='button' onClick={this._handleLogin}>
          Login
        </button>
        {errorMessage}
      </div>
    );
  }
}

export default Login;
