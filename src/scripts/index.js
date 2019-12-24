import '../styles/index.css';

// Импортируем необходимые модули
import { NewsCard } from '../blocks/news-card/NewsCard';
import { NewsApi } from './modules/NewsApi';
import { AnyContentHolder } from './modules/AnyContentHolder';

const cardsContainer = document.querySelector('.results__cards-container');
const searchForm = document.querySelector('.search__form');
const bannerWait = document.querySelector('.progress_wait');
const bannerNothing = document.querySelector('.progress_no-result');

const newsApikey = 'd5080e38d27a400eb92d036d47715e50';  // Ключ для доступа к сервису
const newsType = 'everything';                          // Тип поиска
const newsFrom = -7;                                    // Фильтр по начальной дате поиска (дней до текущей)
const newsTo = 0;                                       // Фильтр по конечной дате поиска (дней до текущей)
const newsMaxCount = 100;                               // Максимальный размер поиска (записей)


// Создаём контейнер для карточек с новостями.
// В качестве аргументов указываем ему на узел контейнера и на тип дочерних элементов (ссылка на конструктор новостной карточки)
const newsHolder = new AnyContentHolder(cardsContainer, (...rest) => new NewsCard (...rest));

// Создаём экземпляр класса работы с сервисом поиска новостей с заданными параметрами
const newsApi = new NewsApi(newsApikey, newsType, newsFrom, newsTo, newsMaxCount);

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    bannerWait.classList.remove('progress_hide');
    bannerNothing.classList.add('progress_hide');
    
    newsApi.getNews(event.target.elements[0].value)
    .then((data) => {
        console.log(data);
        bannerWait.classList.add('progress_hide');
        if(data.totalResults === 0)
            bannerNothing.classList.remove('progress_hide');
    })
    .catch((err) => {
        console.log(err);
    })
});




newsHolder.addItem(1, 2, 3, 4, 5);
newsHolder.addItem(1, 2, 3, 4, 5);
newsHolder.addItem(1, 2, 3, 4, 5);
newsHolder.addItem(1, 2, 3, 4, 5);