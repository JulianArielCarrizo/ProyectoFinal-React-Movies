import { create } from 'zustand';

const useWatchLaterStore = create((set) => ({
  watchLater: [],
  toggleWatchLater: (movie) =>
    set((state) => ({
      watchLater: state.watchLater.some((storedMovie) => storedMovie.id === movie.id)
        ? state.watchLater.filter((storedMovie) => storedMovie.id !== movie.id)
        : [...state.watchLater, movie],
    })),
  clearWatchLater: () => set({ watchLater: [] }), // Para limpiar la lista
}));

export default useWatchLaterStore;