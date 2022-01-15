import React from 'react';
import propTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { artistName, collectionName, artworkUrl100 } = this.props;
    return (
      <section className="AlbumCard">
        <img
          src={ artworkUrl100 }
          alt={ collectionName }
        />
        <span>{ collectionName }</span>
        <p>{ artistName }</p>
      </section>
    );
  }
}

AlbumCard.propTypes = {
  artistName: propTypes.string.isRequired,
  collectionName: propTypes.string.isRequired,
  artworkUrl100: propTypes.string.isRequired,
};

export default AlbumCard;
