// Импортируем базовый класс
import { BaseComponent } from '../../scripts/modules/BaseComponent';
export class CommitCard extends BaseComponent
{
    _DESCRPTION_MAX_LENGTH = 200;    // Граница для урезки текста описания коммита

    // Конструктор класса
    constructor(commit)
    {
        super();
        // Создаём корневой элемент и сохраняем ссылку на него
        this.root = document.createElement('div');
        this.root.classList.add('commit-card');
        this.root.classList.add('carousel-cell');

        // Чистим поля от XSS
        commit = this.xssObjectFix(commit);

        // Сокращаем текст описания коммита (при необходимости)
        if(commit.description.length > this._DESCRPTION_MAX_LENGTH)
            commit.description = commit.description.slice(0, this._DESCRPTION_MAX_LENGTH) + '...';

        // Вставляем в конец элемента внутреннюю разметку по шаблону
        this.root.insertAdjacentHTML('beforeend',
        `
            <a class="commit-card__link custom-cursor" href="${commit.link}" target="_blank"></a>
            <time class="commit-card__data-stamp" datetime="${commit.datetime}">${commit.date}</time>
            <div class="commit-card__personal-container">
                <img class="commit-card__avatar" src="${commit.avatar}" alt="Фото автора коммита">
                <p class="commit-card__name">${commit.author}</p>
                <p class="commit-card__mail">${commit.email}</p>
            </div>
            <p class="commit-card__description">${commit.description}</p>
        `);
    }

    // Метод для монтирования карточки в желаемый контейнер
    deploy(location)
    {
        location.appendChild(this.root);
    }
}