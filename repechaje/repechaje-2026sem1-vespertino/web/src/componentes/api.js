import { useEffect, useState } from 'react';

const BASE_URL = new URL('https://api.scryfall.com/');

const HEADERS = {
  Accept: 'Accept: application/json;q=0.9,*/*;q=0.8',
  // 'User-Agent': 'MTGExampleApp/0.1',
};

// See <https://scryfall.com/docs/api/cards/random>.
export function useFetchRandomCard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await globalThis.fetch(new URL('/cards/random', BASE_URL), {
          headers: { ...HEADERS },
        });
        if (res.ok) {
          setData(await res.json());
        }
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { data, isLoading, error };
}
