import { useState, useEffect } from 'react';
import { SOVEREIGN_LIBRARY } from '../data/sovereign_library';

export const useLibrary = () => {
  // We no longer fetch from DB for definitions. We use the Master File.
  // This kills the network loop instantly.
  return {
    library: SOVEREIGN_LIBRARY,
    isLoading: false,
    error: null
  };
};
