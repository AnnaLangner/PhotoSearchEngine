import axios from 'axios';

const PHOTO_API_URL = 'https://api.unsplash.com';
const PHOTO_KEY = 'EDHGdz3E421x8BvOwRQEgOR51hWN9EaqiLiy1SkMdPc';

export async function getPhoto(searchingText) {
  let url = PHOTO_API_URL + '/search/photos?query=' + searchingText + '&client_id=' + PHOTO_KEY;
  const result = await axios.get(url)
  console.log(result.data.results)
  return result.data.results
}