'use strict';

// Класс работы с отрисовкой гистограммы
export class Week
{
    // Конструктор класса
    constructor(holder)
    {
        this._holder = holder;  // Ссылка на гистограмму
    }

    insertHeader(caption0, caption1)
    {
        // Создаём корневой элемент
        const root = document.createElement('div');
        root.classList.add('week__header');

        // Вставляем в конец элемента внутреннюю разметку по шаблону
        root.insertAdjacentHTML('beforeend',
        `
            <p class="week__month week__column">${caption0}</p>
            <p class="week__mentions">${caption1}</p>
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

    insertBar(caption, value)
    {
        // Создаём корневой элемент
        const root = document.createElement('div');
        root.classList.add('week__row');
        root.classList.add('week__row_progress');

        // Вставляем в конец элемента внутреннюю разметку по шаблону
        root.insertAdjacentHTML('beforeend',
        `
            <p class="week__day-caption week__column">${caption}</p>
            <div class="week__row-content-container">
                <span class="week__bar" style="width: ${value}%">${value}</span>
            </div>
        `);
        this._holder.appendChild(root);
    }
}



          
