import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import LogoImg from '../img/logo-trybetunes.png';
import { createUser } from '../services/userAPI';
import '../styles/login.css';

const MIN_CHARACTER = 3;

class Login extends React.Component {
  // Consultei o repositorio do Lucas Petzinger para tirar uma ideia de como fazer a mensagem de 'carregando...'
  // e o Redirec para a página principal após o login pois não conseguia fazer o redirecionamento funcionar então saquei a ideia
  // de criar os estados 'logged' e 'loading' e usar a renderização condicional olhando o código dele e repliquei nos requisitos posteriores.
  // "https://github.com/tryber/sd-017-project-trybetunes/tree/lucas-petzinger-trybetunes-project"
  constructor() {
    super();
    this.state = {
      inputUserName: '',
      isButtonDisabled: true,
      loading: false,
      logged: false,
    };
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

  onSubmitButtonClick = (event) => {
    event.preventDefault();
    const { inputUserName } = this.state;
    const newUser = {
      name: inputUserName,
    };
    this.setState({ loading: true }, async () => {
      // Após setar o estado loading como true, chama de forma asyncrona a função createUser com um obj contente as informações do usuario.
      // Ao terminar a função createUser seta os states loading como false e logged como true.
      // O estado logged será usado para renderização condicional, usando o redirect do react router para encaminhar a pagina principal.
      await createUser(newUser);
      this.setState({
        loading: false,
        logged: true });
    });
  };

  renderLoginPage = () => {
    const { inputUserName, isButtonDisabled } = this.state;
    return (
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
    );
  }

  render() {
    const { loading, logged } = this.state;
    return (
      <div data-testid="page-login" className="login-page">
        { /* verifica se logged é true, caso verdadeiro faz o redirect  */ }
        {logged && <Redirect to="/search" />}

        { loading ? <Loading /> : this.renderLoginPage() }
      </div>
    );
  }
}

export default Login;
