import { DateTime } from 'luxon';

export function updatedDateToString(datestamp: number): string {
    const date = new Date(datestamp);
    const dt = DateTime.fromJSDate(date);
    dt.setZone('America/Chicago');

    return dt.toFormat('MMMM d, yyyy');
}
