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
const weekContainer = document.querySelector('.week__holder');  // Контейнер гистограммы

// Создаём экземпляр класса для работы с гистограммой
const weeklyStats = new Week(weekContainer);

window.onload = function() {

    let statistics = JSON.parse(sessionStorage.getItem('statistics'));    // Пробуем считать результат запроса
    if(statistics == null)
    {
        const news = JSON.parse(sessionStorage.getItem('news'));    // Пробуем считать результат запроса
        if(news === null)   // Если результата нет - оставляем страницу в исходном состоянии
            return;

        statistics = [];            // Инициализируем пустой массив для хранения статистики
        let date = new Date();      // Получаем текущую дату без учёта времени
        date.setHours(0, 0, 0, 0);  // Обнуляем поля времени
        let i = 0;                  // Инициализируем счётчик

        // Наполняем массив объектами с датами и кол-вом упоминаний
        while(i < STATISTICS_DAY_DEPTH)
        {
            console.log(date);
            const item = {
                date: undefined,
                quantity: 0
            };
            
            item.date = date.getTime();     // Записываем преобразованную к миллисекундам дату
            statistics.push(item);          // Помещаем в массив

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
                if(statistics[i].date == date)
                {
                    statistics[i].quantity++;
                    break;
                }
            }
        });

        
        sessionStorage.setItem('statistics', JSON.stringify(statistics));
    }

    let newHeaderRequired = true;      // Признак необходимости вставить новой "шапки"

    for(let i = statistics.length -1; i >= 0;)
    {
        const current = dateParser(statistics[i].date);

        if(newHeaderRequired)   // Если нужно вставить
        {
            // Добавляем "шапку", "линейку" и строку
            weeklyStats.insertHeader(`месяц (${current.monthNameNom})`, 'кол-во упоминаний');
            weeklyStats.insertRuler();
            weeklyStats.insertBar(current.short, statistics[i].quantity);
            newHeaderRequired = false;
            i--;    // Идём дальше
        }
        else    // Если не нужно
        {
            // Получаем предыдущее значение (а оно существует, т.к. если попали сюда, то это не первая итерация)
            const prev = dateParser(statistics[i+1].date);
            if(current.month != prev.month) // Проверяем, не иземнился ли месяц
            {
                newHeaderRequired = true;   // Если да - выставляем флаг, счётчик не трогаем
            }
            else    // Если нет - добавляем строку и идём дальше
            {
                weeklyStats.insertBar(current.short, statistics[i].quantity);
                i--;
            }
        }
    }
    weeklyStats.insertRuler();
};