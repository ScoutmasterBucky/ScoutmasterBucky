import { component, html } from 'fudgel';

component(
    'smb-header-banner',
    {
        template: html`
            <a
                href="/"
                aria-label="Scoutmaster Bucky Main Page"
                class="unprintable"
            >
                <img .src="src" class="wide" alt="Scoutmaster Bucky Banner" />
            </a>
        `,
    },
    class {
        src = '';
        constructor() {
            const d = new Date();
            const month = d.getMonth() + 1;
            const pad = month < 10 ? '0' : '';
            const src = `/images/banner${pad}${month}.webp`;
        }
    }
);
