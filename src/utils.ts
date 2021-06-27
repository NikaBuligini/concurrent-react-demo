const BASE_URL = "https://rickandmortyapi.com/api";

export const callApi = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  return await response.json();
}
