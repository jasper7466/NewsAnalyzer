'use strict';

// Импортируем базовый класс
import { BaseComponent } from '../../scripts/modules/BaseComponent';

// Класс работы с отрисовкой гистограммы
export class Week extends BaseComponent
{
    // Конструктор класса
    constructor(holder)
    {
        super();
        this._holder = holder;  // Ссылка на гистограмму
    }

    insertHeader(header)
    {
        // Создаём корневой элемент
        const root = document.createElement('div');
        root.classList.add('week__header');

        // Чистим поля от XSS
        header = this.xssObjectFix(header);

        // Вставляем в конец элемента внутреннюю разметку по шаблону
        root.insertAdjacentHTML('beforeend',
        `
            <p class="week__month week__column">${header.caption}</p>
            <p class="week__mentions">${header.value}</p>
        `);
        this._holder.appendChild(root);
    }

    insertRuler()
    {
        // Создаём корневой элемент
        const root = document.createElement('div');
        root.classList.add('week__row');
        root.classList.add('week__row_ruler');

        // Вставляем в конец элемента внутреннюю разметку по шаблону
        root.insertAdjacentHTML('beforeend',
        `
            <p class="week__column"></p>
            <span class="week__graduation">
                <span class="week__grad">0</span>
                <span class="week__grad">25</span>
                <span class="week__grad">50</span>
                <span class="week__grad">75</span>
                <span class="week__grad">100</span>
            </span>
        `);
        this._holder.appendChild(root);
    }

    insertBar(bar)
    {
        // Создаём корневой элемент
        const root = document.createElement('div');
        root.classList.add('week__row');
        root.classList.add('week__row_progress');

        // Чистим поля от XSS
        bar = this.xssObjectFix(bar);

        // Вставляем в конец элемента внутреннюю разметку по шаблону
        root.insertAdjacentHTML('beforeend',
        `
            <p class="week__day-caption week__column">${bar.caption}</p>
            <div class="week__row-content-container">
                <span class="week__bar" style="width: ${bar.value}%">${bar.value}</span>
            </div>
        `);
        this._holder.appendChild(root);
    }
}



          
