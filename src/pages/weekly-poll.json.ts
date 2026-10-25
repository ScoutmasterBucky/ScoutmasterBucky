// The weekly poll questions as JSON, published at /weekly-poll.json. The vote
// server reads this file so it only counts votes for the current week and for
// options that exist.
import polls from '~/data/weekly-poll.yaml';

export function GET() {
    return new Response(JSON.stringify(polls), {
        headers: { 'Content-Type': 'application/json' },
    });
}
