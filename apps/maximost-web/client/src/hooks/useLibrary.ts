import { SOVEREIGN_LIBRARY } from '@/data/sovereign_library';

export const useLibrary = () => {
  // STATIC RETURN - NO FETCHING
  // This forces the app to use the Master File immediately.
  return {
    library: SOVEREIGN_LIBRARY, 
    isLoading: false,
    error: null,
    refresh: () => {}
  };
};