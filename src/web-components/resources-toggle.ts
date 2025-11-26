import { component, css, html } from 'fudgel';

component(
    'resources-toggle',
    {
        style: css`
            .centered-line {
                display: flex;
                align-items: center;
            }

            .left-gap {
                margin-left: 8px;
            }

            .toggle-input {
                display: none;
            }

            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 22px;
                background-color: #ccc;
                border-radius: 22px;
                cursor: pointer;
                transition: background-color 0.4s;
            }

            .slider {
                position: absolute;
                content: '';
                height: 16px;
                width: 16px;
                left: 1px;
                bottom: 3px;
                background-color: white;
                border-radius: 50%;
                transition: transform 0.4s;
            }

            .toggle-input:checked + .slider {
                transform: translateX(18px);
            }

            .toggle-switch:has(.toggle-input:checked) {
                background-color: green;
            }
        `,
        template: html`
            <div class="centered-line">
                <label class="toggle-switch" @change.stop.prevent="update">
                    <input type="checkbox" class="toggle-input" #ref="toggle" />
                    <span class="slider round"></span>
                </label>
                <span class="left-gap">Show additional resources</span>
            </div>
        `,
    },
    class {
        toggle!: HTMLInputElement;

        update() {
            const showResources = !!this.toggle.checked;

            for (const element of document.getElementsByClassName(
                'resource-toggle'
            )) {
                element.classList.toggle('hidden', !showResources);
            }
        }
    }
);
