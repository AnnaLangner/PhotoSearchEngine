import axios from 'axios';

const PHOTO_URL = 'https://unsplash-tests.herokuapp.com/';

export async function getAutocomplete(searchingText) {
  let url = PHOTO_URL + searchingText
  const result = await axios.get(url)
  return result.data
}