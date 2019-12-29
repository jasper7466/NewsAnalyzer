// Класс для работы с API сервиса https://github.com/
export class GitHubApi
{
    _moduleName = 'GitHubApi';    // Название модуля (для формирования сообщений об ошибках)

    // Конструктор.
    constructor(user, repo)
    {
        this._URL = `https://api.github.com/repos/${user}/${repo}/commits`;  // URL для запросов
    }

    // Внутренний метод для отправки запросов
    _sendRequest(URL)
    {
        // Делаем запрос и возвращаем промис
        return fetch(URL)//, settings)
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

    getCommits()
    {
        return this._sendRequest(this._URL);
    }
}
