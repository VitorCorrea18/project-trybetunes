import React from 'react';
import Header from '../components/Header';
import '../styles/search.css';

const MIN_SEARCH_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isSearchButtonDisabled: true,
      searchInput: '',
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      if (value.length >= MIN_SEARCH_LENGTH) {
        this.setState({ isSearchButtonDisabled: false });
      } else this.setState({ isSearchButtonDisabled: true });
    });
  }

  render() {
    const { isSearchButtonDisabled, searchInput } = this.state;

    return (
      <div data-testid="page-search" className="search-page">
        <Header />
        <form onSubmit={ this.onSubmitButtonClick } className="form-search">
          <input
            data-testid="search-artist-input"
            className="input-search"
            placeholder="Nome do artista"
            name="searchInput"
            value={ searchInput }
            onChange={ this.onInputChange }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            className="search-button"
            disabled={ isSearchButtonDisabled }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
