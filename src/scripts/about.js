// Импортируем корневой файл стилей страницы
import '../styles/about.css';

// Импортируем сторонние библиотеки
import Flickity from 'flickity';

// Импортируем необходимые модули из блоков

// Импортируем модули общего назначения
import { GitHubApi } from './modules/GitHubApi';
import { AnyContentHolder } from './modules/AnyContentHolder';

// Создаём слайдер, указываем ссылку на слайдер коммитов
let commitSlider = new Flickity( '.main-carousel', {
  groupCells: 1,
});

// Создаём экземпляр класса для получения коммитов, указываем пользователя и репозитарий
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