import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.recoverFavoritesList();
  }

  recoverFavoritesList = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, favorites: favoriteSongs });
  }

  removeFavorite = async (thisFavorite) => {
    await removeSong(thisFavorite);
    const upDatedList = await getFavoriteSongs();
    this.setState({ favorites: upDatedList });
  }

  render() {
    const { loading, favorites } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <section className="track-list-section">
          <ul className="track-list">
            {
              loading
                ? <Loading />
                : (
                  favorites.map((music) => {
                    const { previewUrl, trackName, trackId } = music;
                    return (
                      <MusicCard
                        key={ trackId }
                        previewUrl={ previewUrl }
                        trackName={ trackName }
                        trackId={ Number(trackId) }
                        favorites={ favorites }
                        removeFavorite={ this.removeFavorite }
                      />
                    );
                  })
                )
            }
          </ul>
        </section>
      </div>
    );
  }
}

export default Favorites;
