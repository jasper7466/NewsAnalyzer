'use strict';

// Класс работы с баннерами состояния
export class Progress
{
    // Конструктор класса
    constructor(waitBanner = undefined, emptyBanner = undefined)
    {
        this._wait = waitBanner;     // Ссылка на прелоадер
        this._empty = emptyBanner;   // Ссылка на баннер с пустым результатом
    }

    // Метод отображения баннера "Идёт поиск"
    showWait()
    {
        this._wait.classList.remove('progress_hide');
        this._empty.classList.add('progress_hide');
    }

    // Метод отображения баннера "Ничего не найдено"
    showEmpty()
    {
        this._wait.classList.add('progress_hide');
        this._empty.classList.remove('progress_hide');
    }

    // Метод скрытия всех баннеров
    hide()
    {
        this._wait.classList.add('progress_hide');
        this._empty.classList.add('progress_hide');
    }
}