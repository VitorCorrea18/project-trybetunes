import React from 'react';
import LogoImg from '../img/logo-header.png';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    this.setState({ loading: true }, async () => {
      const USER = await getUser();
      const { name } = USER;
      this.setState({ userName: name, loading: false });
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component" className="header">
        {
          loading
            ? <Loading />
            : (
              <section className="top-header">
                <img src={ LogoImg } alt="trybe-tunes-logo" className="logo-header" />
                <div className="user-button">
                  <span data-testid="header-user-name">{ userName }</span>
                </div>
              </section>)
        }

      </header>
    );
  }
}

export default Header;
