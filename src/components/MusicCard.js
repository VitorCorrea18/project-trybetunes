import React from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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
    this.recoverFavoritesSongs();
  }

  addFavorite = async () => {
    const { trackName, previewUrl, trackId } = this.props;
    const newFavorite = { trackName, previewUrl, trackId };
    this.setState({ loading: true });
    await addSong(newFavorite);
    this.setState({ loading: false });
  }

  onFavoriteInputChange = () => {
    const { isFavorite } = this.state;
    if (isFavorite) {
      this.setState({ isFavorite: false });
    } else this.setState({ isFavorite: true });
    this.addFavorite();
  }

  recoverFavoritesSongs = async () => {
    const { trackId } = this.props;
    const allFavorites = await getFavoriteSongs();
    if (allFavorites.find((song) => song.trackId === trackId)) {
      this.setState({ isFavorite: true });
    }
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
};

export default MusicCard;
