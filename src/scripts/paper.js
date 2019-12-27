// Импортируем корневой файл стилей страницы
import "../styles/paper.css";

// Импортируем необходимые модули из блоков
import { Week } from '../blocks/week/Week';

// Импортируем модули и утилиты общего назначения
import { dateParser } from './utilities/DateParser';

// Константы

// Получаем ссылки на необходимые узлы структуры документа
const weekContainer = document.querySelector('.week__holder');  // Контейнер гистограммы

// Создаём экземпляр класса для работы с гистограммой
const weeklyStats = new Week(weekContainer);

window.onload = function() {
    weeklyStats.insertHeader('test', 'test');
    weeklyStats.insertRuler();
    weeklyStats.insertBar('test', 5);
    weeklyStats.insertBar('test', 10);
    weeklyStats.insertBar('test', 15);
    weeklyStats.insertBar('test', 20);
    weeklyStats.insertBar('test', 25);
    weeklyStats.insertBar('test', 30);
    weeklyStats.insertBar('test', 35);
    weeklyStats.insertRuler();
};