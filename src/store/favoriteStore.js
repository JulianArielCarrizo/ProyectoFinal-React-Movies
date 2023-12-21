import { create } from 'zustand';

const useFavoritesStore = create((set) => ({
  favorites: [],
  toggleFavorite: (movie) =>
    set((state) => ({
      favorites: state.favorites.some((storedMovie) => storedMovie.id === movie.id)
        ? state.favorites.filter((storedMovie) => storedMovie.id !== movie.id)
        : [...state.favorites, movie],
    })),
  clearFavorites: () => set({ favorites: [] }), // Para limpiar la lista
}));

export default useFavoritesStore;