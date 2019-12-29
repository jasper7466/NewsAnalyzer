// Импортируем базовый класс
import { BaseComponent } from '../../scripts/modules/BaseComponent';
export class NewsCard extends BaseComponent
{
    // Конструктор класса
    constructor(card)
    {
        super();
        // Создаём корневой элемент и сохраняем ссылку на него
        this.root = document.createElement('a');
        this.root.classList.add('news-card');
        this.root.setAttribute('href', card.link);
        this.root.setAttribute('target', '_blank');

        // Чистим поля от XSS
        card = this.xssObjectFix(card);

        // Вставляем в конец элемента внутреннюю разметку по шаблону
        this.root.insertAdjacentHTML('beforeend',
        `
            <div class="news-card__pic-container">
                <img class="news-card__pic" src="${card.pic}" alt="Фоновое изображение новостной карточки">
            </div>
            <div class="news-card__info">
                <time class="news-card__data-stamp" datetime="2019-08-02">${card.date}</time>
                <h3 class="news-card__title">${card.title}</h3>
                <p class="news-card__description">${card.description}</p>
                <p class="news-card__source" >${card.source}</p>
            </div>
        `);
    }

    // Метод для монтирования карточки в желаемый контейнер
    deploy(location)
    {
        location.appendChild(this.root);
    }
}