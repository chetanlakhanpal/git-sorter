const api = require('./helpers/api');
const git = require('./helpers/git');
const file = require('./helpers/file');
const base64 = require('./helpers/base64');

const path = require('path');

const paths = {
  inputCsv: path.join(__dirname, 'data', 'git-repos.csv'),
  inputTsv: path.join(__dirname, 'data', 'git-repos.txt'),
  outputCsv: path.join(__dirname, 'data', 'result.csv'),
  keywords: path.join(__dirname, 'data', 'keywords.txt'),
  outputJson: path.join(__dirname, 'data', 'git-repo.js')
};

const keywords = [];

file
  .readFile(paths.keywords)
  .then((data) => {
    data.split('\n').forEach((keyword) => keywords.push(keyword));
  })
  .catch((err) => console.log(err));

api.getRepos().then((res) => {
  let repos = res.data;
  let reposToProcess = repos.filter((repo) => repo.found == 0);
  console.log(`Processing ${reposToProcess.length} Repositories`);
  reposToProcess.forEach((repo) => {
    let repoUrl = repo['url'];
    let tags = repo['tags'] ? repo['tags'].split(',') : [];
    repoUrl = repoUrl
      ? repoUrl.replace('https://github.com', 'https://api.github.com/repos')
      : repoUrl;
    git
      .getRepo(repoUrl)
      .then((repoDetails) => {
        git.getReadme(repoUrl).then((readmeDetails) => {
          let content = base64.decode(readmeDetails.data['content']);
          keywords.forEach((keyword) => {
            if (content.indexOf(keyword) != -1) {
              tags.push(keyword);
            }
          });
          repo['tags'] = tags.join(',');
          repo['found'] = 1;
          api
            .updateRepo(repo)
            .then((result) => console.log('Repo analysed and details updated'))
            .catch((err) => console.log('Unable to update repo'));
        });
      })
      .catch((err) => console.log('repo fetch', err));
  });
});
