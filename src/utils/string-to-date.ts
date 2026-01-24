import { DateTime } from 'luxon';

export interface DateParsedResult {
    date: Date;
    hasTime: boolean;
    success: boolean;
}

// Converts a CST string in the following formats to a Date object. Returns an
// object with the date and a hasTime flag.
//     YYYY-MM-DD
//     YYYY-MM-DD H:MM
//     YYYY-MM-DD HH:MM
export function stringToDate(
    dateString: string | undefined
): DateParsedResult {
    if (!dateString) {
        return {
            date: new Date(0),
            hasTime: false,
            success: false,
        };
    }

    let date = new Date();
    let hasTime = false;

    if (!dateString.includes(' ')) {
        date = DateTime.fromFormat(dateString, 'yyyy-MM-dd').toJSDate();
    } else {
        date = DateTime.fromFormat(dateString, 'yyyy-MM-dd H:mm', {
            zone: 'America/Chicago',
        }).toJSDate();
        hasTime = true;
    }

    return {
        date,
        hasTime,
        success: true,
    };
}
