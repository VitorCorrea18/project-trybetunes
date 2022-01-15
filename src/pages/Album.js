import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbumCard from '../components/AlbumCard';
import MusicCard from '../components/MusicCard';
import '../styles/musicPage.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      artworkUrl100: '',
      collectionName: '',
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id).then((result) => result);
    const albumInfo = request.find((album) => album.artistName);
    const musics = request.filter((track) => track.previewUrl);
    this.setState({
      musics,
      artistName: albumInfo.artistName,
      artworkUrl100: albumInfo.artworkUrl100,
      collectionName: albumInfo.collectionName,
    });
  };

  render() {
    const { musics, artistName, artworkUrl100, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <main className="music-page">
          <AlbumCard
            className="album-card"
            artistName={ artistName }
            collectionName={ collectionName }
            artworkUrl100={ artworkUrl100 }
          />
          <section className="track-list-section">
            <ul className="track-list">
              {
                musics.map((music) => {
                  const { previewUrl, trackName } = music;
                  return (
                    <MusicCard
                      key={ trackName }
                      previewUrl={ previewUrl }
                      trackName={ trackName }
                    />
                  );
                })
              }
            </ul>
          </section>
        </main>

      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.instanceOf(Object).isRequired,
};

export default Album;
