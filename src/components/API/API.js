import axios from 'axios';

const KEY = '31974365-341749123fa485f09eb8b1d6d';
const BASE_URL = `https://pixabay.com/api/?&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

export const fetchPhotoes = async (query, page) => {
  const response = axios.get(`${BASE_URL}&q=${query}&page=${page}`);
  return (await response).data.hits;
};
