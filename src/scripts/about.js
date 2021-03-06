'use strict';

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

// Создаём экземпляр класса для получения коммитов, указываем пользователя и репозиторий
const githubApi = new GitHubApi('jasper7466', 'NewsAnalyzer');

function renderPage(maxRender)
{
  githubApi.getCommits()
    .then((data) => {
      for(let i = 0; i < maxRender; i++)
      {
        const commit = {
          author: data[i].commit.committer.name,
          email: data[i].commit.committer.email,
          description: data[i].commit.message,
          link: data[i].html_url,
          avatar: data[i].author.avatar_url,
          datetime: data[i].commit.committer.date,
          date: dateParser(data[i].commit.committer.date).printable
        };
        commitsHolder.addItem(commit);
      }
      // Создаём слайдер, указываем ссылку на узел слайдера коммитов
      const commitSlider = new Flickity('.commits__carousel', {
        groupCells: 1,
        wrapAround: true,
        autoPlay: 5000,
        groupCells: '100%'
      });
      // Пришлось перенести его именно сюда, т.к. инициализация ломает вёрстку в случае,
      // когда карточки ещё не добавлены.
  })
  .catch((err) => {
      console.log(err);
  })
}

window.onload = function() {
  renderPage(MAX_ITEM_PER_RENDER);
};