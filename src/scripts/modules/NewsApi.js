// Класс для работы с API сервиса https://newsapi.org
export class NewsApi
{
    _moduleName = 'NewsApi';             // Название модуля (для формирования сообщений)
    _URL = 'https://newsapi.org/v2/';    // Базовая часть адреса для запросов

    // Конструктор.
    constructor(newsApikey, newsType, newsFrom, newsTo, newsMaxCount)
    {
        this._key = newsApikey;     // Ключ для доступа к сервису
        this._type = newsType;      // Тип поиска
        this._from = newsFrom;      // Начальная дата поиска (дней до текущей)      
        this._to = newsTo;          // Конечная дата поиска (дней до текущей)
        this._count = newsMaxCount; // Размер поиска (кол-во записей)
    }

    // Внутренний метод для отправки запросов
    _sendRequest(URL)
    {
        // Делаем запрос и возвращаем промис
        return fetch(URL)
            .then((res) => {
                if (res.ok)
                    return res.json();
                return Promise.reject(`${this._moduleName}. Error: ${res.status}`);
            })
            .catch((err) => {
                console.log(`${this._moduleName}. Request failed: ${err}`);
                return Promise.reject(err);
            });
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
        date.setDate(date.getDate() + this._from + 1);
        const parsedFrom = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        // Аналогично для даты "до"
        date = new Date();
        date.setDate(date.getDate() + this._to);
        const parsedTo = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        // Формируем URL
        const URL = `${this._URL}${this._type}?q=${query}&from=${parsedFrom}&to=${parsedTo}&sortBy=popularity&language=ru&pageSize=${this._count}&apiKey=${this._key}`;
        
        // Выполняем запрос, возвращаем промис
        return this._sendRequest(URL);
    }
}
