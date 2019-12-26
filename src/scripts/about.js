import '../styles/about.css';

import Flickity from 'flickity';

// Импортируем модули общего назначения
import { GitHubApi } from './modules/GitHubApi';
import { AnyContentHolder } from './modules/AnyContentHolder';


let commitSlider = new Flickity( '.main-carousel', {
  groupCells: 1,
});



const githubApi = new GitHubApi('jasper7466', 'NewsAnalyzer');

window.onload = function() {
  githubApi.getCommits()
    .then((data) => {
      console.log(JSON.stringify(data));
  })
  .catch((err) => {
      console.log(err);
  })
};