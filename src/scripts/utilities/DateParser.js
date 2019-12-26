'use strict';

// Парсер даты формата YYYY-MM-DD...
export function dateParser(DateTime)
{
    const date = DateTime.slice(0,10).split('-', 3);
    
    const parsedData =
    {
        year:       date[0],
        month:      date[1],
        day:        date[2],
        monthName:  '',
        printable:  ''
    }
    const year = date[0];
    const month = date[1];
    const day = date[2];

    switch(month)
    {
        case '01': parsedData.monthName = 'января'; break;
        case '02': parsedData.monthName = 'февраля'; break;
        case '03': parsedData.monthName = 'марта'; break;
        case '04': parsedData.monthName = 'апреля'; break;
        case '05': parsedData.monthName = 'мая'; break;
        case '06': parsedData.monthName = 'июня'; break;
        case '07': parsedData.monthName = 'июля'; break;
        case '08': parsedData.monthName = 'августа'; break;
        case '09': parsedData.monthName = 'сентября'; break;
        case '10': parsedData.monthName = 'октября'; break;
        case '11': parsedData.monthName = 'ноября'; break;
        case '12': parsedData.monthName = 'декабря'; break;
    }

    // Человекочитаемый формат
    parsedData.printable = `${parsedData.day} ${parsedData.monthName}, ${parsedData.year}`;

    return(parsedData);
}