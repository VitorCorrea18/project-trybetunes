import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import LogoImg from '../img/logo-header.png';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: '',
      image: '',
      description: '',
      name: '',
      isButtonDisabled: false,
      profileEditDone: false,
    };
  }

  componentDidMount() {
    this.recoverUserData();
  }

  recoverUserData = async () => {
    this.setState({ loading: true });
    const userData = await getUser();
    this.setState({
      email: userData.email,
      image: userData.image,
      description: userData.description,
      name: userData.name,
      loading: false,
    });
    this.checkData();
  }

  checkData = () => {
    const { email, image, description } = this.state;
    if (email === '') this.setState({ email: 'user@user.com' });
    if (image === '') this.setState({ image: LogoImg });
    if (description === '') {
      this.setState({
        description: 'Você ainda não escreveu uma descrição',
      });
    }
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (this.validateButton()) {
      this.setState({ isButtonDisabled: false });
    } else this.setState({ isButtonDisabled: true });
  }

  validateButton = () => {
    const keys = Object.keys(this.state);
    const { state } = this;
    if (!keys.find((key) => state[key] === '')) return true;
    return false;
  }

  onSubmitButtonClick = async () => {
    const { name, email, image, description } = this.state;
    const upDatedUser = { name, email, image, description };
    this.setState({ loading: true });
    await updateUser(upDatedUser);
    this.setState({ profileEditDone: true });
  }

  render() {
    const {
      name, email, description, image, loading, isButtonDisabled, profileEditDone,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {
          profileEditDone && <Redirect to="/profile" />
        }
        <Header />

        {
          loading
            ? <Loading />
            : (

              <form onSubmit={ this.onSubmitButtonClick }>
                <section className="profile-image-section">
                  <img
                    src={ image }
                    alt="imagem do usuario"
                  />
                  <input
                    data-testid="edit-input-image"
                    name="image"
                    className="image-input"
                    id="imageInput"
                    value={ image }
                    type="text"
                    onChange={ this.onInputChange }
                  />
                </section>
                <label
                  htmlFor="name-input"
                >
                  Nome
                  <span>Fique a vontade para usar seu nome social</span>
                  <input
                    data-testid="edit-input-name"
                    name="name"
                    className="form-input"
                    id="name-input"
                    value={ name }
                    type="text"
                    onChange={ this.onInputChange }
                  />
                </label>

                <label
                  htmlFor="email-input"
                >
                  E-mail
                  <span>Escolha um e-mail que consulte diariamente</span>
                  <input
                    data-testid="edit-input-email"
                    name="email"
                    className="form-input"
                    id="email-input"
                    value={ email }
                    type="text"
                    onChange={ this.onInputChange }
                  />
                </label>

                <label
                  htmlFor="description-input"
                >
                  Descrição
                  <textarea
                    data-testid="edit-input-description"
                    name="description"
                    className="form-textarea"
                    id="description-input"
                    value={ description }
                    type="text"
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  data-testid="edit-button-save"
                  type="submit"
                  className="profile-save-button"
                  disabled={ isButtonDisabled }
                >
                  Salvar
                </button>
              </form>
            )
        }
      </div>
    );
  }
}

export default ProfileEdit;
