import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';
import '../styles/search.css';

const MIN_SEARCH_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isSearchButtonDisabled: true,
      searchInput: '',
      artistName: '',
      loading: false,
      albuns: [],
      notFound: false,
      showResult: false,
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

  fetchAlbum = async () => {
    const { searchInput } = this.state;
    const searchResult = await searchAlbumsAPI(searchInput);
    if (searchResult.length === 0) {
      this.setState({ notFound: true });
    } else this.setState({ notFound: false });
    // lucas
    this.setState({
      albuns: searchResult,
      artistName: searchInput,
      searchInput: '',
      loading: false,
      showResult: true });
  }

  onSubmitButtonClick = (event) => {
    event.preventDefault();
    this.setState({ loading: true }, this.fetchAlbum);
  };

  renderSearchForm = () => {
    const { isSearchButtonDisabled, searchInput } = this.state;
    return (
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
    );
  }

  render() {
    const { loading, albuns, notFound, artistName, showResult } = this.state;

    return (
      <div data-testid="page-search" className="search-page">
        <Header />
        {this.renderSearchForm()}
        {loading && <Loading />}

        {showResult && <span>{`Resultado de álbuns de: ${artistName}`}</span>}
        {(notFound && <span>Nenhum álbum foi encontrado </span>)}

        <ul className="album-list">
          {
            albuns.map((album) => {
              const { collectionId } = album;
              return (
                <li key={ collectionId }>
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    <AlbumCard
                      artistName={ album.artistName }
                      collectionName={ album.collectionName }
                      artworkUrl100={ album.artworkUrl100 }
                    />
                  </Link>

                </li>
              );
            })

          }
        </ul>
      </div>
    );
  }
}

export default Search;
