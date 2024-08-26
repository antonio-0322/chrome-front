import axios from 'axios';
import { ApiClient } from '../baseRqeuest';
import { VITE_GEOAPIFY_API_KEY, VITE_GEOAPIFY_API_URL } from '../../utils/variablesFromEnv';

const getAdditionalQuestions = () =>
  ApiClient.get('setup/additional-questions/');

const getJobSearchFilters = (platform) =>
  ApiClient.get(`setup/job-search-filters/${platform}/`);

const setupUserResume = (data) =>
  ApiClient.post('user/setup-job-settings/', data);

const getSearchJobUrl = () =>
  ApiClient.get('job-apply/job-search-url/linkedin/');

const setupJobSearchFilters = (data) =>
  ApiClient.post('user/setup-job-search-filters/', data);

const getLocations = (data) =>{
  const apiKey = VITE_GEOAPIFY_API_KEY;
  const  url = VITE_GEOAPIFY_API_URL + `?text=${encodeURIComponent(data)}&type=city&filter=countrycode:us&bias=countrycode:us&format=json&apiKey=${apiKey}&limit=100`;

  return axios.get(url);
}

export const SetupApi = {
  getAdditionalQuestions,
  getJobSearchFilters,
  setupUserResume,
  getSearchJobUrl,
  setupJobSearchFilters,
  getLocations
};
