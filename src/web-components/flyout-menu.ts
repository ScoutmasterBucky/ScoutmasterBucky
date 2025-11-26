import { component, css, html } from 'fudgel';
import './menu-button';

component(
    'flyout-menu',
    {
        style: css`
            .menu {
                background: var(--flyout-menu-background);
                color: var(--flyout-menu-text-color);
                display: none;
                left: calc(-100% + 60px);
                padding: 8px;
                position: fixed;
                top: 0;
                transition: left 0.5s;
                transition-timing-function: ease-in-out;
                width: calc(100% - 60px);
                border-right: var(--flyout-menu-border);
                border-bottom: var(--flyout-menu-border);
            }

            .menu.flyout {
                left: 0;
            }

            @media screen and (max-width: 480px) {
                .menu {
                    display: block;
                }
            }

            .toggle {
                position: absolute;
                top: 0;
                left: 100%;
                display: block;
                background: var(--flyout-menu-background);
                padding: 8px;
                border-right: var(--flyout-menu-border);
                border-bottom: var(--flyout-menu-border);
            }

            svg {
                fill: var(--flyout-menu-icon-color);
            }

            .featured {
                padding-left: 1em;
            }
        `,
        template: html`
            <div #ref="menu" class="unprintable menu">
                <a class="toggle" @click.stop.prevent="toggle()" href="#">
                    <svg
                        viewBox="0 0 100 100"
                        width="40"
                        height="40"
                        class="Fill(--buttonBackground)"
                    >
                        <rect
                            x="5"
                            y="14"
                            width="90"
                            height="16"
                            rx="10"
                        ></rect>
                        <rect
                            x="5"
                            y="42"
                            width="90"
                            height="16"
                            rx="10"
                        ></rect>
                        <rect
                            x="5"
                            y="70"
                            width="90"
                            height="16"
                            rx="10"
                        ></rect>
                    </svg>
                </a>
                <menu-button
                    href="/"
                    title="Scoutmaster Bucky"
                    src="/images/smb-small.png"
                    subtitle="an area for Scouts BSA"
                ></menu-button>

                <div class="featured">
                    <menu-button
                        href="/merit-badges/"
                        title="Merit Badges"
                        src="/images/merit-badges-icon.png"
                    ></menu-button>
                    <menu-button
                        href="/test-lab/"
                        title="Test Lab"
                        src="/images/test-lab-icon.webp"
                    ></menu-button>
                    <menu-button
                        href="/scout-ranks/"
                        title="Scout Ranks"
                        src="/images/ranks-icon.png"
                    ></menu-button>
                    <menu-button
                        href="/other-awards/"
                        title="Other Awards"
                        src="/images/other-awards-icon.png"
                    ></menu-button>
                </div>
            </div>
        `,
    },
    class {
        menu!: HTMLDivElement;

        toggle() {
            this.menu.classList.toggle('flyout');
        }
    }
);
