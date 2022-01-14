import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import LogoImg from '../img/logo-trybetunes.png';
import { createUser } from '../services/userAPI';
import '../styles/login.css';

const MIN_CHARACTER = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputUserName: '',
      isButtonDisabled: true,
      loading: false,
    };
  }

  // Não sei se estou fazendo certo. O teste local não funciona. Mas tenho que setar o loading como true enquanto faço
  // a requisição e ao terminar setar novamente pra falso. Mas não sei ainda onde devo colocar o await ou then para fazer isso.
  componentDidUpdate() {
    const { loading } = this.state;
    if (loading) {
      return (<Loading />);
    } this.renderLoginPage();
  }

  checkValueLength = (value) => {
    if (value.length >= MIN_CHARACTER) {
      this.setState({ isButtonDisabled: false });
    } else this.setState({ isButtonDisabled: true });
  }

  onInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, this.checkValueLength(value));
    // chama a função checkValueInput para validar se o input tem 3 ou mais caracteres.
    // A função é chamada após o setState terminar de atualizar o estado.
  }

  // redirect = () => const history = useHistory();

  login = async (newUser) => {
    await createUser(newUser);
    return (<Redirect to="/search" />);
  }

  onSubmitButtonClick = (event) => {
    event.preventDefault();
    const { inputUserName } = this.state;
    const newUser = {
      name: inputUserName,
    };
    this.setState({ loading: true });
    this.login(newUser);
  }

  renderLoginPage = () => {
    const { inputUserName, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-login" className="login-page">
        <section className="login-rectangle">
          <img
            className="logo-trybe-tunes"
            src={ LogoImg }
            alt="logo-trybetunes"
          />
          <div className="form-rectangle">
            <form className="login-form" onSubmit={ this.onSubmitButtonClick }>
              <input
                data-testid="login-name-input"
                name="inputUserName"
                className="login-input"
                placeholder="Nome"
                value={ inputUserName }
                onChange={ this.onInputChange }
              />
              <button
                data-testid="login-submit-button"
                type="submit"
                disabled={ isButtonDisabled }
                className="btn"
              >
                Entrar
              </button>

            </form>
          </div>
        </section>

      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : this.renderLoginPage() }
      </div>

    );
  }
}

export default Login;
