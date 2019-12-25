'use strict';

// Класс для работы с API сервиса https://newsapi.org
export class NewsApi
{
    // Конструктор.
    constructor(newsApikey, newsType, newsFrom, newsTo, newsMaxCount)//, onRequest = undefined, onResponse = undefined, onEmpty = undefined, onError = undefined)
    {
        this._key = newsApikey;     // Ключ для доступа к сервису
        this._type = newsType;      // Тип поиска
        this._from = newsFrom;      // Начальная дата поиска (дней до текущей)      
        this._to = newsTo;          // Конечная дата поиска (дней до текущей)
        this._count = newsMaxCount; // Размер поиска (кол-во записей)
        this._URL = 'https://newsapi.org/v2/';    // Базовая часть адреса для запросов
        // this._onRequest = onRequest;
        // this._onResponse = onResponse;
        // this._onEmpty = onEmpty;
        // this._onError = onError;
    }

    // Приватный метод для проверки и вызова опциональных функций
    _runFunc(func, ...rest)
    {
        if(func != undefined)
            func(rest);
    }

    getNews(query)
    {
        // Проверка на "перехлёст" дат
        if (this._from > this._to)
            return(Promise.reject(new Error('NewsApi Error: date "to" should be greater than date "from". Please check instance init.')));
        // Проверка на пустой запрос
        if (query === '')
            return(Promise.reject(new Error('NewsApi Error: query should not be empty.')));

        // Вычисляем дату "от" и парсим в удобоваримый для сервиса формат
        let date = new Date();
        date.setDate(date.getDate() + this._from);
        const parsedFrom = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        // Аналогично для даты "до"
        date = new Date();
        date.setDate(date.getDate() + this._to);
        const parsedTo = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        
        // if(this._onRequest != undefined)
        //     this._onRequest();

        return fetch(`${this._URL}${this._type}?q=${query}&from=${parsedFrom}&to=${parsedTo}&sortBy=popularity&language=ru&pageSize=${this._count}&apiKey=${this._key}`)
            .then((res) => {
                if (res.ok)
                {
                    // if(this._onResponse != undefined)
                    //     this._onResponse();
                    // if(res.totalResults === 0)
                    // {
                    //     if(this._onEmpty != undefined)
                    //         this._onEmpty();
                    // }
                    // console.log(res);
                    return res.json();
                }
                return Promise.reject(`NewsApi Error: ${res.status}`);
            })
            .catch((err) => {
                console.log('NewsApi Request failed: ', err);
                return Promise.reject(err);
            });
    }
}
