import { useEffect, useState } from "react";

export function useTeamData(code, stickers = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const options = !stickers ? { method: 'GET' } : {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stickers }),
        };
        const res = await fetch(
          `/api/teams/${encodeURIComponent(code)}`,
          options,
        );
        if (res.ok) {
          setData(await res.json());
        } else {
          setError(new Error(`Fetch error ${res.status}!`));
        }
      } catch (fetchError) {
        setError(fetchError);
      }
      setIsLoading(false);
    })();
  }, [code, stickers]);

  return { data, error, isLoading };
}
