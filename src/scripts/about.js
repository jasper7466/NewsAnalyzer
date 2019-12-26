// Импортируем корневой файл стилей страницы
import '../styles/about.css';

// Импортируем сторонние библиотеки
import Flickity from 'flickity';

// Импортируем необходимые модули из блоков
import { CommitCard } from '../blocks/commit-card/CommitCard';

// Импортируем модули и утилиты общего назначения
import { GitHubApi } from './modules/GitHubApi';
import { AnyContentHolder } from './modules/AnyContentHolder';
import { dateParser } from './utilities/DateParser';

// Константы
const MAX_ITEM_PER_RENDER = 20;      // Кол-во карточек для рендеринга

// Получаем ссылки на необходимые узлы структуры документа
const commitsContainer = document.querySelector('.commits__carousel');  // Слайдер с коммитами

// Создаём контейнер для карточек с новостями.
// В качестве аргументов указываем ему на узел контейнера и на тип дочерних элементов (ссылка на конструктор новостной карточки)
const commitsHolder = new AnyContentHolder(commitsContainer, (...rest) => new CommitCard (...rest));

// Создаём экземпляр класса для получения коммитов, указываем пользователя и репозитарий
const githubApi = new GitHubApi('jasper7466', 'NewsAnalyzer');

function renderPage(max_render)
{
  githubApi.getCommits()
    .then((data) => {
      // data = JSON.parse(data);
      console.log(data);
      for(let i = 0; i < max_render; i++)
      {
        const author = data[i].commit.committer.name;
        const email = data[i].commit.committer.email;
        const description = data[i].commit.message;
        const link = data[i].commit.url;
        const avatar = data[i].author.avatar_url;
        const datetime = data[i].commit.committer.date;
        const date = dateParser(datetime).printable;

        commitsHolder.addItem(link, avatar, author, email, description, date, datetime);
      }
      // Создаём слайдер, указываем ссылку на слайдер коммитов
      let commitSlider = new Flickity( '.commits__carousel', {
        groupCells: 1,
      });
  })
  .catch((err) => {
      console.log(err);
  })
}


window.onload = function() {
  renderPage(MAX_ITEM_PER_RENDER);
};