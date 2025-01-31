import { component, html } from 'fudgel';
import './slot.mjs';

component(
    'smb-accent',
    {
        template: html`
            <span class="Trsdu(2s) Trsp(all) Fw(b) Fz(1.3em) C(--themeText)"
                ><slot></slot
            ></span>
        `,
    },
    class {}
);
