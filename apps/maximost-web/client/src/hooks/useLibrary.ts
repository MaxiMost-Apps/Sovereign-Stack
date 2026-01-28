import { useState, useEffect } from 'react';
import { SOVEREIGN_LIBRARY } from '@/data/sovereign_library';

export const useLibrary = () => {
  // WE ARE BYPASSING THE DATABASE FETCH.
  // The 'SOVEREIGN_LIBRARY' file is now the Single Source of Truth.
  const [library] = useState(SOVEREIGN_LIBRARY);
  const [loading] = useState(false);

  return { library, loading };
};
