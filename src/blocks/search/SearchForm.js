'use strict';

// Класс работы с баннерами состояния
export class SearchForm
{
    // Конструктор класса
    constructor(form, onSubmit)
    {
        this._form = form;               // Ссылка на форму
        this._handler = onSubmit;        // Функция-обработчик данных от формы
        this._form.addEventListener('submit', (event) => this._submit(event));
    }

    // Метод валидации. Должен вызываться только по событию "submit"
    _validate()
    {
        return true;
    }

    // Обработчик события "submit"
    _submit(event)
    {
        event.preventDefault();
        if(!this._validate())
            return;
        this._handler(event.target.elements[0].value);
    }
}