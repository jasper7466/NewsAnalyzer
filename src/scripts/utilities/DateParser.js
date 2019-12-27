'use strict';

// Парсер даты
export function dateParser(dateTime)
{
    const date = new Date(dateTime);

    const parsedData =
    {
        year:       date.getFullYear(),
        month:      date.getMonth(),
        day:        date.getDate(),
        dayName:    {
            full:   '',
            short:  ''
        },
        monthName:  '',
        printable:  ''
    }

    switch(date.getMonth())
    {
        case 0: parsedData.monthName = 'января'; break;
        case 1: parsedData.monthName = 'февраля'; break;
        case 2: parsedData.monthName = 'марта'; break;
        case 3: parsedData.monthName = 'апреля'; break;
        case 4: parsedData.monthName = 'мая'; break;
        case 5: parsedData.monthName = 'июня'; break;
        case 6: parsedData.monthName = 'июля'; break;
        case 7: parsedData.monthName = 'августа'; break;
        case 8: parsedData.monthName = 'сентября'; break;
        case 9: parsedData.monthName = 'октября'; break;
        case 10: parsedData.monthName = 'ноября'; break;
        case 11: parsedData.monthName = 'декабря'; break;
        default: console.log('DateParser: unknown month index.'); break;
    }

    switch(date.getDay())
    {
        case 0:
            parsedData.dayName.full = 'воскресенье';
            parsedData.dayName.short = 'вс';
            break;
        case 1:
            parsedData.dayName.full = 'понедельник';
            parsedData.dayName.short = 'пн';
            break;
        case 2:
            parsedData.dayName.full = 'вторник';
            parsedData.dayName.short = 'вт';
            break;
        case 3:
            parsedData.dayName.full = 'среда';
            parsedData.dayName.short = 'ср';
            break;
        case 4:
            parsedData.dayName.full = 'четверг';
            parsedData.dayName.short = 'чт';
            break;
        case 5:
            parsedData.dayName.full = 'пятница';
            parsedData.dayName.short = 'пт';
            break;
        case 6:
            parsedData.dayName.full = 'суббота';
            parsedData.dayName.short = 'сб';
            break;
        default:
            console.log('DateParser: unknown day of week index.');
            break;
    }

    // Человекочитаемый формат
    parsedData.printable = `${parsedData.day} ${parsedData.monthName}, ${parsedData.year}`;
    parsedData.short = `${parsedData.day}, ${parsedData.dayName.short}`;

    return(parsedData);
}