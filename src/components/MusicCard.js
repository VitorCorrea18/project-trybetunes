import React from 'react';
import propTypes from 'prop-types';
import '../styles/musicPage.css';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl } = this.props;

    return (
      <section className="track-section">
        <span className="track-name">{trackName}</span>
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
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
};

export default MusicCard;
