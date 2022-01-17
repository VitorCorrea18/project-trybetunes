import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbumCard from '../components/AlbumCard';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import '../styles/musicPage.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      artworkUrl100: '',
      collectionName: '',
      favorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchMusics();
    this.recoverFavoritesSongs();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/json
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

  addFavorite = async (newFavorite) => {
    await addSong(newFavorite);
    const upDatedList = await getFavoriteSongs();
    this.setState({ favorites: upDatedList });
  }

  removeFavorite = async (thisFavorite) => {
    await removeSong(thisFavorite);
    const upDatedList = await getFavoriteSongs();
    this.setState({ favorites: upDatedList });
  }

  recoverFavoritesSongs = async () => {
    this.setState({ loading: true });
    const allFavorites = await getFavoriteSongs();
    this.setState({ favorites: allFavorites, loading: false });
  }

  render() {
    const {
      musics, artistName, artworkUrl100, collectionName, favorites, loading,
    } = this.state;
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
                loading
                  ? <Loading />
                  : (
                    musics.map((music) => {
                      const { previewUrl, trackName, trackId } = music;
                      return (
                        <MusicCard
                          key={ trackId }
                          previewUrl={ previewUrl }
                          trackName={ trackName }
                          trackId={ trackId }
                          favorites={ favorites }
                          addFavorite={ this.addFavorite }
                          removeFavorite={ this.removeFavorite }
                          test={ this.test }
                        />
                      );
                    })
                  )
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
