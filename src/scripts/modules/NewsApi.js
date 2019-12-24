'use strict';

// Класс для работы с API сервиса https://newsapi.org
export class NewsApi
{
    // Конструктор.
    constructor(newsApikey, newsType, newsFrom, newsTo, newsMaxCount)
    {
        this._key = newsApikey;     // Ключ для доступа к сервису
        this._type = newsType;      // Тип поиска
        this._from = newsFrom;      // Начальная дата поиска (дней до текущей)      
        this._to = newsTo;          // Конечная дата поиска (дней до текущей)
        this._count = newsMaxCount; // Размер поиска (кол-во записей)
        this._URL = 'https://newsapi.org/v2/';    // Базовая часть адреса для запросов
    }

    getNews(query)
    {
        // Проверка на "перехлёст" дат
        if (this._from > this._to)
            return(Promise.reject(new Error('NewsApi Error: date "to" should be greater than date "from". Please check instance init')));

        let date = new Date();
        date.setDate(date.getDate() + this._from);
        const parsedFrom = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        date = new Date();
        date.setDate(date.getDate() + this._to);
        const parsedTo = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        console.log(`${this._URL}${this._type}?q=${query}&from=${parsedFrom}&to=${parsedTo}&sortBy=popularity&language=ru&pageSize=${this._count}&apiKey=${this._key}`);

        return fetch(`${this._URL}${this._type}?q=${query}&from=${parsedFrom}&to=${parsedTo}&sortBy=popularity&language=ru&pageSize=${this._count}&apiKey=${this._key}`)
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(`Error: ${res.status}`);
            })
            .catch((err) => {
                console.log('Request failed: ', err);
                return Promise.reject(err);
            });
    }
}