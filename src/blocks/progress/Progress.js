// Класс работы с баннерами состояния
export class Progress
{
    // Конструктор класса
    constructor(waitBanner = undefined, emptyBanner = undefined, errorBanner = undefined)
    {
        this._wait = waitBanner;    // Ссылка на прелоадер
        this._empty = emptyBanner;  // Ссылка на баннер с пустым результатом
        this._error = errorBanner;  // Ссылка на баннер с ошибкой запроса
        // Получаем ссылку на поле для вывода текста ошибки
        this._text = this._error.lastElementChild;
    }

    // Метод отображения баннера "Идёт поиск"
    showWait()
    {
        this._wait.classList.remove('progress_hide');
        this._empty.classList.add('progress_hide');
        this._error.classList.add('progress_hide');
    }

    // Метод отображения баннера "Ничего не найдено"
    showEmpty()
    {
        this._wait.classList.add('progress_hide');
        this._empty.classList.remove('progress_hide');
        this._error.classList.add('progress_hide');
    }

    // Метод отображения баннера "Ошибка выполнения запроса"
    showError(err)
    {
        this._wait.classList.add('progress_hide');
        this._empty.classList.add('progress_hide');
        this._error.classList.remove('progress_hide');
        this._text.textContent = err;
    }

    // Метод скрытия всех баннеров
    hide()
    {
        this._wait.classList.add('progress_hide');
        this._empty.classList.add('progress_hide');
        this._error.classList.add('progress_hide');
    }
}