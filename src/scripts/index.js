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
    results.hide();                         // Прячем блок "Резльтаты" и показываем прелоудер
    progress.showWait();
    newsApi.getNews(query)                  // Делаем запрос
        .then((data) => {
            console.log(data);
            progress.hide();                // Прячем прелоудер
            if(data.totalResults === 0)
                progress.showEmpty();       // Показываем баннер "Ничего не найдено", если ничего не найдено)
            else
            {
                if(data.totalResults > 3)   
                    results.showButton();   // Если результатов много - показываем кнопку "Ещё"    
                results.showSection();      // Показываем весь блок, если результаты есть
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

// Создаём экземпляр класса для работы c формой ввода
const form = new SearchForm(searchForm, (...rest) => dataHandler(...rest));

// newsHolder.addItem(1, 2, 3, 4, 5);
// newsHolder.addItem(1, 2, 3, 4, 5);
// newsHolder.addItem(1, 2, 3, 4, 5);
// newsHolder.addItem(1, 2, 3, 4, 5);