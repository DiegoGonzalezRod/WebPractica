import React, { useState, useEffect } from 'react';
import { fetchComics } from '../marvelApi';
import ComicDetails from './ComicDetails';

const ComicsFeed = () => {
  const [comics, setComics] = useState([]);  // Todos los cómics
  const [favorites, setFavorites] = useState([]);  // Favoritos
  const [loading, setLoading] = useState(true);  // Indicador de carga
  const [error, setError] = useState(null);  // Manejo de errores
  const [selectedComicId, setSelectedComicId] = useState(null);  // Cómic seleccionado
  const [viewFavorites, setViewFavorites] = useState(false);  // Controla la vista

  // useEffect para cargar los cómics
  useEffect(() => {
    fetchComics()
      .then(fetchedComics => {
        setComics(fetchedComics);
      })
      .catch(() => {
        setError('Error fetching comics');
      })
      .finally(() => {
        setLoading(false);
      });

    // Cargar favoritos desde LocalStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Función para alternar entre ver todos los cómics y los favoritos
  const toggleFavoritesView = () => {
    setViewFavorites(prevState => !prevState);
  };

  // Función para agregar o quitar de favoritos
  const toggleFavorite = (comic) => {
    const isFavorite = favorites.some(fav => fav.id === comic.id);
    const updatedFavorites = isFavorite
      ? favorites.filter(fav => fav.id !== comic.id)
      : [...favorites, comic];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Verifica si el cómic está en favoritos
  const isFavorite = (comicId) => favorites.some(fav => fav.id === comicId);

  // Cargar o mostrar los cómics favoritos o todos los cómics
  const comicsToShow = viewFavorites ? favorites : comics;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(comics);

  return (
    <div>
      {/* Botón para alternar entre todos los cómics y los favoritos */}
      <button onClick={toggleFavoritesView} className="toggle-view-button">
        {viewFavorites ? 'Show All Comics' : 'Show Favorites'}
      </button>

      {/* Si se seleccionó un cómic, mostramos los detalles */}
      {selectedComicId ? (
        <ComicDetails comicId={selectedComicId} onBack={() => setSelectedComicId(null)} />
      ) : (
        <div className="comics-container">
          {comicsToShow.map((comic) => (
            <div key={comic.id} className="comic" onClick={() => setSelectedComicId(comic.id)}>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              {/* Botón para agregar o quitar de favoritos */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(comic);
                }}
                className={`favorite-button ${isFavorite(comic.id) ? 'favorited' : ''}`}
              >
                {isFavorite(comic.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComicsFeed;
