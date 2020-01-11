'use strict';

// Импортируем корневой файл стилей страницы
import '../styles/index.css';

// Импортируем необходимые модули из блоков
import { NewsCard } from '../blocks/news-card/NewsCard';
import { Progress } from '../blocks/progress/Progress';
import { Results } from '../blocks/results/Results';
import { SearchForm } from '../blocks/search/SearchForm';

// Импортируем модули и утилиты общего назначения
import { NewsApi } from './modules/NewsApi';
import { AnyContentHolder } from './modules/AnyContentHolder';
import { dateParser } from './utilities/DateParser';

// Константы
const MAX_ITEM_PER_RENDER = 3;      // Кол-во результатов за один рендер

// Получаем ссылки на необходимые узлы структуры документа
const searchForm = document.querySelector('.search__form');                     // Форма с поисковой строкой
const resultsSection = document.querySelector('.results');                      // Секция "Результаты поиска"
const cardsContainer = document.querySelector('.results__cards-container');     // Контейнер для новостных карточек
const buttonShowMore = document.querySelector('.results__button');              // Кнопка "Показать ещё"
const bannerWait = document.querySelector('.progress_wait');                    // Баннер "Идёт поиск"
const bannerNothing = document.querySelector('.progress_no-result');            // Баннер "Ничего не найдено"
const bannerError = document.querySelector('.progress_error');                  // Баннер "Ошибка выполнения запроса"

// Задаём конфигурацию поискового движка
const newsApikey = 'd5080e38d27a400eb92d036d47715e50';  // Ключ для доступа к сервису
const newsType = 'everything';                          // Тип поиска
const newsFrom = -7;                                    // Фильтр по начальной дате поиска (дней до текущей, включительно)
const newsTo = 0;                                       // Фильтр по конечной дате поиска (дней до текущей, включительно)
const newsMaxCount = 100;                               // Максимальный размер поиска (записей)

// Создаём контейнер для карточек с новостями.
// В качестве аргументов указываем ему на узел контейнера и на тип дочерних элементов (ссылка на конструктор новостной карточки)
const newsHolder = new AnyContentHolder(cardsContainer, (...rest) => new NewsCard (...rest));

// Создаём экземпляр класса для работы сервиса поиска новостей с заданными параметрами
const newsApi = new NewsApi(newsApikey, newsType, newsFrom, newsTo, newsMaxCount);

// Создаём экземпляр класса для работы c баннерами статуса
const progress = new Progress(bannerWait, bannerNothing, bannerError);

// Функция рендеринга
function renderPage(maxRender)
{
    let head = 0;   // Текущая позиция в массиве найденных новостей
    let max = maxRender;

    // Создаём замыкание
    function render()
    {
        const news = JSON.parse(localStorage.getItem('news'));    // Пробуем считать результат запроса

        if(news === null)   // Если результата нет - оставляем страницу в исходном состоянии
            return;

        const query = localStorage.getItem('query');              // Пробуем считать текст запроса

        if(query === null)  // Если текста нет - оставляем страницу в исходном состоянии
            return;

        // Помещаем текст запроса в строку поиска и рендерим результаты
        form.setQuery(localStorage.getItem('query'));
        
        if(news.totalResults === 0)
        {
            progress.showEmpty();   // Показываем баннер "Ничего не найдено", если ничего не найдено :)
            return;
        }
    
        // Определяем, сколько новостей можем отобразить в данный момент
        let stop = head + Math.min(news.articles.length - head, max);
        for(head; head < stop; head++)
        {
            const card = {
                link: news.articles[head].url,
                pic: news.articles[head].urlToImage,
                date: dateParser(news.articles[head].publishedAt).printable,
                title: news.articles[head].title,
                description: news.articles[head].description,
                source: news.articles[head].source.name
            };
            newsHolder.addItem(card);
        }

        if(head < news.totalResults)
            results.showButton();   // Если остались неотрендеренные карточки - показываем кнопку "Ещё"
        else
            results.hideButton();   // Если нет - прячем кнопку

        buttonShowMore.textContent = `Показать ещё (${news.articles.length - head})`;
        results.showSection();      // Отображаем секцию с результатами
    }
    return render;
}

let render = renderPage(MAX_ITEM_PER_RENDER);     // Создаём экземпляр функции рендеринга

// Функция обработки ввода
function dataHandler(query)
{
    results.hide();         // Прячем блок "Результаты"
    progress.showWait();    // Показываем прелоудер
    newsHolder.clear();     // Чистим контейнер от карточек

    newsApi.getNews(query)                              // Делаем запрос
        .then((data) => {
            localStorage.setItem('news', JSON.stringify(data));   // Cохраняем ответ сервера в сессию
            localStorage.removeItem('statistics');                // Удаляем вычисленную статистику (paper.js)
            localStorage.setItem('query', query);                 // Сохраняем в сессию поисковый запрос
            progress.hide();                            // Прячем прелоудер
            render = renderPage(MAX_ITEM_PER_RENDER);   // Сбрасываем функцию рендеринга (её счётчик из замыкания)
            render();                                   // Запускаем рендер результатов
        })
        .catch((err) => {
            console.log(err);
            progress.showError(err);
        })
        .finally( () => {
            form.unlock();                              // Снимаем блокировку с формы
        });
}

// Создаём экземпляр класса для работы c баннерами статуса
const results = new Results(resultsSection, buttonShowMore, () => render());

// Создаём экземпляр класса для работы c формой ввода
const form = new SearchForm(searchForm, (...rest) => dataHandler(...rest));

// Рендерим страницу при её загрузке.
window.onload = function() {
    render();
};