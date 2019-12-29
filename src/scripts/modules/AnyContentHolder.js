// Контейнер для чего-либо
export class AnyContentHolder
{
    // Конструктор. Принимает на вход ссылку на узел контейнера и функцию создания элемента
    // Требование к классу элемента: наличие публичного свойства "root", указывающего на его верхний узел DOM-структуры
    constructor(location, creator)  
    {
        this._collection = [];       // Массив добавляемых объектов
        this._creator = creator;     // Ссылка на конструктор экземпляра объекта
        this._container = location;  // Запоминаем ссылку на контейнер
    }

    // Метод добавления экземпляра объекта и его размещения в контейнере
    // Набор аргументов явно не зафиксирован, чтобы класс оставался унифицированным
    addItem()
    {
        const newItem = this._creator(...arguments);    // Передаём аргументы в конструктор класса хранимых объектов
        this._collection.push(newItem);                 // Кладём в "коллекцию" свежесозданный экземпляр
        this._container.appendChild(newItem.root);      // Размещаем в контейнере
    }

    // Метод удаления экземпляра по событию, которое сгенерировал его элемент
    pullOff(event)
    {
        this._collection = this._collection.filter(obj => obj.root !== event.target.root);
    }

    // Метод полной очистки контейнера
    clear()
    {
        this._collection.forEach((item) => this._container.removeChild(item.root));
        this._collection = [];
    }
}
