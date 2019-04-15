process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios').default;
const gitPaths = {
  readme: 'readme'
};
const config = {
  headers: {
    Authorization: 'token a412764aace65f8d1579199a7cf223c332707101'
    //Authorization: 'token 0c3c0c7204154933c978aa5db2745b34d0df0608'
  }
};
const git = {
  getRepo: (repoUrl) => {
    return axios.get(repoUrl, config);
  },
  getReadme: (repoUrl) => {
    let readMeUrl = `${repoUrl}/${gitPaths.readme}`;
    return axios.get(readMeUrl, config);
  }
};
module.exports = git;
