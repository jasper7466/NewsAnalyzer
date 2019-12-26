'use strict';

export class CommitCard
{
    // Конструктор класса
    constructor(link,avatar, author, mail, description, date, datetime = undefined)
    {

        // Создаём корневой элемент и сохраняем ссылку на него
        this.root = document.createElement('div');
        this.root.classList.add('commit-card');
        this.root.classList.add('carousel-cell');

        // Вставляем в конец элемента внутреннюю разметку по шаблону
        this.root.insertAdjacentHTML('beforeend',
        `
            <a class="commit-card__link custom-cursor" href="${link}" target="_blank"></a>
            <time class="commit-card__data-stamp" datetime="${datetime}">${date}</time>
            <div class="commit-card__personal-container">
                <img class="commit-card__avatar" src="${avatar}" alt="Фото автора коммита">
                <p class="commit-card__name">${author}</p>
                <p class="commit-card__mail">${mail}</p>
            </div>
            <p class="commit-card__description">${description}</p>
        `);
    }

    // Метод для монтирования карточки в желаемый контейнер
    deploy(location)
    {
        location.appendChild(this.root);
    }
}