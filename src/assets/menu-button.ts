import { component, css, html } from 'fudgel';

component(
    'menu-button',
    {
        attr: ['href', 'src', 'subtitle', 'title'],
        style: css`
.pad {
    padding: 0.1em;
}

a {
    background: var(--menu-button-background);
    border: var(--menu-button-border);
    border-radius: 0.4em;
    padding: 0.4em;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.2s;
}

a:hover {
    background: var(--menu-button-background-hover);
}

@media (min-width: 468px) and (max-width: 768px) {
    a {
        font-size: 0.9em;
    }
}

.icon-wrapper {
    display: flex;
    height: 35px;
    width: 51px; /* Includes 16px padding */
    padding-right: 16px;
    flex-shrink: 0;
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    .icon-wrapper {
        display: none;
    }
}

.title {
    color: var(--menu-button-title-color);
    font-weight: bold;
    display: flex;
    justify-content: center;
    text-align: center;
    transition: all 0.2s;
}

a:hover .title {
    color: var(--menu-button-title-color-hover);
}

.subtitle {
    color: var(--menu-button-subtitle-color);
    display: flex;
    justify-content: center;
    font-size: 0.8em;
}

@media (max-width: 1024px) {
    .subtitle {
        display: none;
    }
}
        `,
        template: html`
    <div class="pad">
        <a .href="href">
            <div *if="src" class="icon-wrapper">
                <img .src="src" class="wide" />
            </div>
            <div class="label">
                <div class="title">{{ title }}</div>
                <div *if="subtitle" class="subtitle">{{ subtitle }}</div>
            </div>
        </a>
    </div>
        `,
    }
);
