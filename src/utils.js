import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://rickandmortyapi.com/api';

export function callApi(endpoint) {
  return fetch(`${BASE_URL}/${endpoint}`).then(response => response.json());
}

export function useCharacterId() {
  const location = useLocation();

  const queryStr = queryString.parse(location.search);

  const id = Number(queryStr.id);

  return !isNaN(id) ? id : null;
}

const FIRST_CHARACTER_ID = 1;
const LAST_CHARACTER_ID = 493;

export function character(id) {
  return {
    next: () => {
      if (id === LAST_CHARACTER_ID) {
        return FIRST_CHARACTER_ID;
      }

      return id + 1;
    },
    prev: () => {
      if (id === FIRST_CHARACTER_ID) {
        return LAST_CHARACTER_ID;
      }

      return id - 1;
    },
  };
}

export function getRandomCharacterId() {
  const max = LAST_CHARACTER_ID;
  const min = FIRST_CHARACTER_ID;

  return Math.floor(Math.random() * (max - min + 1) + min);
}
