import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import '../styles/musicPage.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isFavorite: false,
    };
  }

  componentDidMount() {
    // ao montar o componente chama a função que verifica se a musica deste card está presente no array de favoritas,
    // para trazer as musicas favoritas já com input como checked.
    this.checkFavorite();
  }

  onFavoriteInputChange = async () => { // atualiza o estado de checked do input favorita.
    const { trackName, previewUrl, trackId, removeFavorite, addFavorite } = this.props;
    const { isFavorite } = this.state;
    const musicInfo = { trackName, previewUrl, trackId };
    if (isFavorite) { // isFavorite é o estado do checked. Caso seja true, muda pra false e chama a função de remover favoritos.
      this.setState({ isFavorite: false, loading: true });
      await removeFavorite(musicInfo);
      this.setState({ loading: false });
    } else { // cao seja falso, muda pra true e chama a função de adicionar favoritos.
      this.setState({ isFavorite: true, loading: true });
      await addFavorite(musicInfo);
    }
    this.setState({ loading: false });
  }

  checkFavorite = () => {
    // verifica se a musica deste card se encontra na lista de favoritos, para setar o estado isFavorite de acordo e marcar
    // as musicas favoritadas.
    const { favorites, trackId } = this.props;
    if (favorites.find((song) => song.trackId === trackId)) {
      this.setState({ isFavorite: true });
    } else this.setState({ isFavorite: false });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isFavorite } = this.state;

    return (
      <section className="track-section">
        <span className="track-name">{trackName}</span>
        {
          loading
            ? <Loading />
            : (
              <audio
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
            )
        }
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          className="favorite-checkbox"
          name="favoriteCheckBox"
          checked={ isFavorite }
          onChange={ this.onFavoriteInputChange }
        />
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  favorites: propTypes.arrayOf(propTypes.object).isRequired,
  removeFavorite: propTypes.func.isRequired,
  addFavorite: propTypes.func.isRequired,
};

export default MusicCard;
