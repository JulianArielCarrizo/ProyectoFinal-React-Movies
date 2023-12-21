import {create} from 'zustand';

const useStore = create((set) => ({
  lastMovieSelected: null,
  setLastMovieSelected: (movie) => set({ lastMovieSelected: movie }),
}));

export default useStore;