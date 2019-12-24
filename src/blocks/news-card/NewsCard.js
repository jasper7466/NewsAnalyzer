'use strict';

export class NewsCard
{
    // Конструктор класса
    constructor(link, pic, date, title, description, source, ...rest)
    {
        // Создаём корневой элемент и сохраняем ссылку на него
        this.root = document.createElement('a');
        this.root.classList.add('news-card');
        this.root.setAttribute('href', link);
        // Вставляем в конец элемента внутреннюю разметку по шаблону
        this.root.insertAdjacentHTML('beforeend',
        `
            <div class="news-card__pic-container">
                <img class="news-card__pic" src="${pic}" alt="Фоновое изображение новостной карточки">
            </div>
            <div class="news-card__info">
                <time class="news-card__data-stamp" datetime="2019-08-02">${date}</time>
                <h3 class="news-card__title">${title}</h3>
                <p class="news-card__description">${description}</p>
                <p class="news-card__source" >${source}</p>
            </div>
        `);
    }

    // Метод для монтирования карточки в желаемый контейнер
    deploy(location)
    {
        location.appendChild(this.root);
    }
}