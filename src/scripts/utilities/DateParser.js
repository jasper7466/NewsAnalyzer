// Парсер даты
export function dateParser(dateTime)
{
    const date = new Date(dateTime);
    const nameNom = ['январь', 'февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']
    const name = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const dayFull = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const dayShort = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

    const parsedData =
    {
        year:           date.getFullYear(),
        month:          date.getMonth(),
        day:            date.getDate(),
        dayName: {
            full:       dayFull[date.getDay()],
            short:      dayShort[date.getDay()]
        },
        monthName:      name[date.getMonth()],
        monthNameNom:   nameNom[date.getMonth()],
        printable:      '',
        short:          ''
    }

    // Человекочитаемый формат
    parsedData.printable = `${parsedData.day} ${parsedData.monthName}, ${parsedData.year}`;
    parsedData.short = `${parsedData.day}, ${parsedData.dayName.short}`;

    return(parsedData);
}