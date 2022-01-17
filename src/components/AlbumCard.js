import React from 'react';
import propTypes from 'prop-types';
import '../styles/albumCard.css';

class AlbumCard extends React.Component {
  render() {
    const { artistName, collectionName, artworkUrl100 } = this.props;
    return (
      <section className="album-card">
        <div className="album-image">
          <img
            src={ artworkUrl100 }
            alt={ collectionName }
          />
        </div>
        <div className="artist-info">
          <span data-testid="album-name">{ collectionName }</span>
          <p data-testid="artist-name">{ artistName }</p>
        </div>
      </section>
    );
  }
}

AlbumCard.propTypes = {
  artistName: propTypes.string.isRequired,
  collectionName: propTypes.string.isRequired,
  artworkUrl100: propTypes.string,
};

AlbumCard.defaultProps = {
  artworkUrl100: '../img/logo-trybetunes.png',
};

export default AlbumCard;
