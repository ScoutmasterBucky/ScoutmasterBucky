import { component, rootElement } from '../fudgel.min.mjs';
import './slot.mjs';

component(
    'smb-accent',
    {
        template:
            '<span class="D(ib) Fw(b) Fz(1.3em) C(--themeText)"><slot-like></slot-like></span>',
    },
    class {}
);
