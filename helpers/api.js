process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios').default;

const baseUrl =
  'https://fest-be-angular-fest.7e14.starter-us-west-2.openshiftapps.com/api';
const URLs = {
  get: `${baseUrl}/repo`,
  post: `${baseUrl}/repo`
};

const api = {
  getRepo: (id) => {
    let url = `${URLs.get}/${id}`;
    return axios.get(url);
  },
  getRepos: () => {
    let url = `${URLs.get}`;
    return axios.get(url);
  },
  updateRepo: (repo) => {
    let url = `${URLs.post}`;
    return axios.post(url, repo);
  }
};
module.exports = api;
