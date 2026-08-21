import { useEffect, useState } from "react";

export function getAPIURL(path) {
  try {
    return new URL(path, new URL(process.env.EXPO_PUBLIC_API_URL).origin);
  } catch (error) {
    throw new Error(`Could not get API URL for ${path} (process.env.EXPO_PUBLIC_API_URL=${process.env.EXPO_PUBLIC_API_URL})!`);
  }
}

export function useFetchIcons() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFn = async () => {
      try {
        const fetchURL = getAPIURL('/icons');
        const response = await fetch(fetchURL, { method: 'GET' });
        if (response.ok) {
          const responseData = await response.json();
          console.log({ responseData }); // FIXME
          setData(responseData);
        } else {
          setError(new Error(`Fetching <${fetchURL}> failed with ${response.status} ${response.statusText}!`));
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchFn();
  }, []);

  return { data, error };
}
