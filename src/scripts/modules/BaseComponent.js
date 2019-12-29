
// Базовый класс. Содержит функционал общего назначения, который может наследоваться другими модулями

export class BaseComponent
{
    // Регулярное выражение для проверки строки на наличие попытки XSS
    _xssFilter = /(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script/ig;

    constructor() {}

    // Метод для проверки строки XSS
    xssCheck(value)
    {
        return this._xssFilter.test(value);
    }

    // Метод для затирания XSS в полях объекта
    xssObjectFix(obj)
    {
        // Проходим по всем полям
        for(let key in obj)
        {
            // Если нашли XSS - очищаем поле
            if(this.xssCheck(obj[key]))
                obj[key] = '';
        }
        return obj;
    }

}