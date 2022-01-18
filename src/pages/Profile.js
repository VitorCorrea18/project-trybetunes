import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import LogoImg from '../img/logo-header.png';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.recoverUserData();
  }

  recoverUserData = async () => {
    this.setState({ loading: true });
    const userData = await getUser();
    this.setState({
      name: userData.name,
      email: userData.email,
      image: userData.image,
      description: userData.description,
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

  render() {
    const { name, description, image, email, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <main className="profile-page">
                <section className="user-info-header">
                  <div className="profile-pic-div">
                    <img
                      data-testid="profile-image"
                      src={ image }
                      alt="imagem do usuário"
                    />
                  </div>
                  <Link to="/profile/edit">
                    <button
                      type="button"
                      className="profile-button"
                      onClick={ this.onEditProfileButtonClick }
                    >
                      Editar perfil
                    </button>
                  </Link>
                </section>
                <section
                  className="name-section"
                >
                  <label
                    htmlFor="user-name"
                    className="label-user-info"
                  >
                    Nome
                    <span id="user-name">{ name }</span>
                  </label>
                </section>
                <section>
                  <label
                    htmlFor="user-email"
                    className="label-user-info"
                  >
                    Email
                    <span id="user-email">{ email }</span>
                  </label>
                </section>
                <section>
                  <label
                    htmlFor="user-description"
                    className="label-user-info"
                  >
                    Descrição
                    <span id="user-description">{ description }</span>
                  </label>
                </section>
              </main>
            )
        }
      </div>
    );
  }
}

export default Profile;
