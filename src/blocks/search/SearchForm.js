'use strict';

// Класс работы с поисковой формой
export class SearchForm
{
    // Конструктор класса
    constructor(form, onSubmit)
    {
        this._form = form;                              // Ссылка на форму
        this._handler = onSubmit;                       // Функция-обработчик данных от формы
        this._input = this._form.elements[0];           // Ссылка на поле ввода
        this._button = this._form.elements[1];           // Ссылка на кнопку отправки
        this._error = this._input.nextElementSibling;   // Ссылка на поле для вывода ошибок

        // Развешиваем слушателей на события
        this._form.addEventListener('submit', (event) => this._submit(event));      // Отправка
        this._form.addEventListener('input', (event) => this._clearError(event));   // Ввод
    }

    // Метод для блокировки формы
    lock()
    {
        this._button.setAttribute('disabled', 'true');
        this._input.setAttribute('disabled', 'true');
        this._form.classList.add('search__form_disabled');
    }

    // Метод для разлокировки формы
    unlock()
    {
        this._button.removeAttribute('disabled');
        this._input.removeAttribute('disabled');
        this._form.classList.remove('search__form_disabled');
    }

    // Метод для программного заполнения поля ввода
    setQuery(query)
    {
        this._input.value = query;
    }

    // Метод для ввода формы в состояние "ошибка валидации" и публикации текста ошибки
    _setError(err)
    {
        this._form.classList.add('search__form_error');
        this._error.classList.remove('search__error_hide')
        this._error.textContent = err;
    }

    // Метод для сброса состояния ошибки
    _clearError()
    {
        this._form.classList.remove('search__form_error');
        this._error.classList.add('search__error_hide')
        this._error.textContent = '';
    }

    // Метод валидации. Должен вызываться только по событию "submit"
    _validate(query)
    {
        // Проверять будем два случая:
        // 1. Ничего не введено или заполнено пробелами
        // 2. Введены только спец-символы и ни одной цифры/буквы

        if(query.length === 0)
        {
            this._setError('Поле должно быть заполнено');
            return false;
        }

        // Удаляем из запроса всё, кроме букв/цифр/пробелов
        query = query.replace(/[^A-Za-zА-Яа-яЁё\d\s]/g, '');

        if(query.length === 0)
        {
            this._setError('Запрос должен содержать не менее 1 буквы или цифры');
            return false;
        }

        return true;
    }

    // Обработчик события "submit"
    _submit(event)
    {
        event.preventDefault();         // Отключаем дефолтное поведение формы
        let query = this._input.value;  // Получаем поисковый запрос
        query = query.trim();           // Убираем лишние пробелы по краям (если таковые имеются)

        if(!this._validate(query))
            return;
        
        // Если валидация прошла успешно
        this.lock();                    // Блокируем форму
        this._handler(query);           // Передаём запрос в обработчик
    }
}