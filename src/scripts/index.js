// Импортируем корневой файл стилей страницы
import '../styles/index.css';

// Импортируем необходимые модули из блоков
import { NewsCard } from '../blocks/news-card/NewsCard';
import { Progress } from '../blocks/progress/Progress';
import { Results } from '../blocks/results/Results';
import { SearchForm } from '../blocks/search/SearchForm';

// Импортируем модули общего назначения
import { NewsApi } from './modules/NewsApi';
import { AnyContentHolder } from './modules/AnyContentHolder';

// Константы
const MAX_ITEM_PER_RENDER = 3;

// Получаем ссылки на необходимые узлы структуры документа
const searchForm = document.querySelector('.search__form');                     // Форма с поисковой строкой
const resultsSection = document.querySelector('.results');                      // Секция "Результаты поиска"
const cardsContainer = document.querySelector('.results__cards-container');     // Контейнер для новостных карточек
const buttonShowMore = document.querySelector('.results__button');              // Кнопка "Показать ещё"
const bannerWait = document.querySelector('.progress_wait');                    // Баннер "Идёт поиск"
const bannerNothing = document.querySelector('.progress_no-result');            // Баннер "Ничего не найдено"

// Задаём конфигурацию поискового движка
const newsApikey = 'd5080e38d27a400eb92d036d47715e50';  // Ключ для доступа к сервису
const newsType = 'everything';                          // Тип поиска
const newsFrom = -7;                                    // Фильтр по начальной дате поиска (дней до текущей)
const newsTo = 0;                                       // Фильтр по конечной дате поиска (дней до текущей)
const newsMaxCount = 100;                               // Максимальный размер поиска (записей)

// Создаём контейнер для карточек с новостями.
// В качестве аргументов указываем ему на узел контейнера и на тип дочерних элементов (ссылка на конструктор новостной карточки)
const newsHolder = new AnyContentHolder(cardsContainer, (...rest) => new NewsCard (...rest));

// Создаём экземпляр класса для работы сервиса поиска новостей с заданными параметрами
const newsApi = new NewsApi(newsApikey, newsType, newsFrom, newsTo, newsMaxCount);

// Создаём экземпляр класса для работы c баннерами статуса
const progress = new Progress(bannerWait, bannerNothing);

// Создаём экземпляр класса для работы c баннерами статуса
const results = new Results(resultsSection, buttonShowMore);

// Функция обработки ввода
function dataHandler(query)
{
    results.hide();         // Прячем блок "Резльтаты"
    progress.showWait();    // Показываем прелоудер
    newsHolder.clear();     // Чистим контейнер от карточек
    sessionStorage.setItem('query', query);     // Сохраняем в сессию поисковый запрос

    newsApi.getNews(query)                      // Делаем запрос
        .then((data) => {
            sessionStorage.setItem('news', JSON.stringify(data));
            progress.hide();                    // Прячем прелоудер
            renderPage(MAX_ITEM_PER_RENDER);    // Запускаем рендер результатов
        })
        .catch((err) => {
            console.log(err);
        })
}

function renderPage(num)
{
    const news = JSON.parse(sessionStorage.getItem('news'));    // Пробуем считать результат запроса

    if(news === null)   // Если результата нет - оставляем страницу в исходном состоянии
        return;

    const query = sessionStorage.getItem('query');              // Пробуем считать текст запроса

    if(query === null)  // Если текста нет - оставляем страницу в исходном состоянии
        return;

    // Помещаем текст запроса в строку поиска и рендерим результаты
    form.setQuery(sessionStorage.getItem('query'));
    
    if(news.totalResults === 0)
    {
        progress.showEmpty();   // Показываем баннер "Ничего не найдено", если ничего не найдено)
        return;
    }
    if(news.totalResults > MAX_ITEM_PER_RENDER)
        results.showButton();   // Если результатов много - показываем кнопку "Ещё"
    else
        num = news.totalResults;

    for(let i = 0; i < num; i++)
    {
        const link = news.articles[i].url;
        const pic = news.articles[i].urlToImage;
        const date = news.articles[i].publishedAt;
        const title = news.articles[i].title;
        const description = news.articles[i].description;
        const source = news.articles[i].source.name;

        newsHolder.addItem(link, pic, date, title, description, source);
    }

    results.showSection();      // Показываем весь блок
}

// Создаём экземпляр класса для работы c формой ввода
const form = new SearchForm(searchForm, (...rest) => dataHandler(...rest));

window.onload = function() {
    renderPage(MAX_ITEM_PER_RENDER);
};
// newsHolder.addItem(1, 2, 3, 4, 5);
// newsHolder.addItem(1, 2, 3, 4, 5);
// newsHolder.addItem(1, 2, 3, 4, 5);
// newsHolder.addItem(1, 2, 3, 4, 5);