import { SOVEREIGN_LIBRARY } from '@/data/sovereign_library';
export const useLibrary = () => {
  return { library: SOVEREIGN_LIBRARY, isLoading: false, error: null, refresh: () => {} };
};
