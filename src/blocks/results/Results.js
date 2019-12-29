// Класс дял работы с контейнером результатов
export class Results
{
    // Конструктор класса
    constructor(section, button, handler)
    {
        this._section = section;        // Ссылка на контейнер
        this._button = button;          // Ссылка на кнопку
        this._buttonHandler = handler;  // Обработчик нажатия на кнопку
        this._button.addEventListener('click', (...rest) => this._buttonHandler(...rest));
    }

    // Метод отображения секции
    showSection()
    {
        this._section.classList.remove('results_hide');
    }

    // Метод отображения кнопки
    showButton()
    {
        this._button.classList.remove('results_hide');
    }

    // Метод скрытия кнопки
    hideButton()
    {
        this._button.classList.add('results_hide');
    }

    // Метод скрытия всех баннеров
    hide()
    {
        this._section.classList.add('results_hide');
        this._button.classList.add('results_hide');
    }
}