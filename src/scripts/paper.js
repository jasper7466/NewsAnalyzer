// Импортируем корневой файл стилей страницы
import "../styles/paper.css";

// Импортируем необходимые модули из блоков
import { Week } from '../blocks/week/Week';

// Импортируем модули и утилиты общего назначения
import { dateParser } from './utilities/DateParser';
import { Date } from "core-js";

// Константы
const STATISTICS_DAY_DEPTH = 7;     // Глубина анализа (дней до текущей даты)
const STATISTICS_DAY_STEP = 1;      // Прореживание анализа (шаг по дням)

// Получаем ссылки на необходимые узлы структуры документа
const weekContainer = document.querySelector('.week__holder');              // Контейнер гистограммы
const queryField = document.querySelector('.statistics__request');        // Поле "Вы спросили"
const totalField = document.querySelector('.statistics__weekly');           // Поле "Новостей за неделю"
const headersField = document.querySelector('.statistics__title-mentions'); // Поле "Упоминаний в заголовках"

// Создаём экземпляр класса для работы с гистограммой
const weeklyStats = new Week(weekContainer);

window.onload = function() {

    let statistics = JSON.parse(localStorage.getItem('statistics'));    // Пробуем считать результат запроса
    if(statistics == null)  // Если для данного запроса статистика ранее не вычислялась - будем вычислять
    {
        const news = JSON.parse(localStorage.getItem('news'));    // Пробуем считать результат запроса
        if(news === null)   // Если результата нет - оставляем страницу в исходном состоянии
            return;

        statistics = {};                        // Инициализируем пустой массив для хранения статистики
        statistics.query = localStorage.getItem('query');   // Поисковый запрос
        statistics.daily = []                   // Массив статистики по дням
        statistics.total = news.totalResults;   // Новостей за неделю
        statistics.headers = 0;                 // Упоминаний в заголовках. Пока инициализируем как 0
        let date = new Date();                  // Получаем текущую дату
        date.setHours(0, 0, 0, 0);              // Обнуляем поля времени
        let i = 0;                              // Инициализируем счётчик

        // Подсчёт упоминаний в заголовках
        // "Чистим" запрос
        const query = localStorage.getItem('query').replace(/[^A-Za-zА-Яа-яЁё\d\s]/g, '').trim().toLowerCase();
        news.articles.forEach(item => {
            // Аналогично, чистим заголовок (только буквы, цифры и пробел)
            const title = (item.title).replace(/[^A-Za-zА-Яа-яЁё\d\s]/g, '').trim().toLowerCase();
            // Считаем вхождения строки запроса в строку заголовка
            statistics.headers += (title.split(query).length -1);
        });
        
        // Наполняем массив объектами с датами и кол-вом упоминаний
        while(i < STATISTICS_DAY_DEPTH)
        {
            console.log(date);
            const item = {
                date: undefined,
                quantity: 0
            };
            
            item.date = date.getTime();     // Записываем преобразованную к миллисекундам дату
            statistics.daily.push(item);          // Помещаем в массив

            // Шагаем на величину шага по дате назад
            date.setDate(date.getDate() - STATISTICS_DAY_STEP);
            i++;
        }

        news.articles.forEach( item => {
            let date = new Date(item.publishedAt);      // Получаем дату в формате Date
            date.setHours(0, 0, 0, 0);                  // Обнуляем поля времени
            date = date.getTime();                      // Преобразовываем к миллисекундам

            for(i = 0; i < STATISTICS_DAY_DEPTH; i++)   // Проходим по массиву до первого совпадения
            {
                if(statistics.daily[i].date == date)
                {
                    statistics.daily[i].quantity++;
                    break;
                }
            }
        });

        localStorage.setItem('statistics', JSON.stringify(statistics));
    }

    // Вставляем значения в разметку
    queryField.textContent = `«${statistics.query}»`;
    totalField.textContent = statistics.total;
    headersField.textContent = statistics.headers;

    let newHeaderRequired = true;      // Признак необходимости вставки новой "шапки"

    for(let i = statistics.daily.length -1; i >= 0;)
    {
        const current = dateParser(statistics.daily[i].date);

        if(newHeaderRequired)   // Если нужно вставить
        {
            // Добавляем "шапку", "линейку" и строку
            weeklyStats.insertHeader(`месяц (${current.monthNameNom})`, 'кол-во упоминаний');
            weeklyStats.insertRuler();
            weeklyStats.insertBar(current.short, statistics.daily[i].quantity);
            newHeaderRequired = false;
            i--;    // Идём дальше
        }
        else    // Если не нужно
        {
            // Получаем предыдущее значение (а оно существует, т.к. если попали сюда, то это не первая итерация)
            const prev = dateParser(statistics.daily[i+1].date);
            if(current.month != prev.month) // Проверяем, не иземнился ли месяц
            {
                newHeaderRequired = true;   // Если да - выставляем флаг, счётчик не трогаем
            }
            else    // Если нет - добавляем строку и идём дальше
            {
                weeklyStats.insertBar(current.short, statistics.daily[i].quantity);
                i--;
            }
        }
    }
    weeklyStats.insertRuler();
};