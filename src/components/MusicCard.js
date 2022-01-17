import React from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../styles/musicPage.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  addFavorite = async () => {
    const { trackName, previewUrl, trackId } = this.props;
    const newFavorite = { trackName, previewUrl, trackId };
    this.setState({ loading: true });
    await addSong(newFavorite);
    this.setState({ loading: false });
  }

  onFavoriteInputChange = () => {
    const { isChecked } = this.state;
    if (isChecked) {
      this.setState({ isChecked: false });
    } else this.setState({ isChecked: true });
    this.addFavorite();
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isChecked } = this.state;

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
          checked={ isChecked }
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
