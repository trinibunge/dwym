import useFetch from './useFetch';

export const useFetchCountries = () => {
  return useFetch('/api/countries');
};

export const useFetchCountryByCode = (cca3) => {
  const url = cca3 ? `/api/countries/${encodeURIComponent(cca3)}` : null;
  return useFetch(url);
};

export const useFetchRandomCountries = (n) => {
  const url = n ? `/api/countries/random?n=${encodeURIComponent(+n)}` : null;
  return useFetch(url);
};
