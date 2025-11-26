import { component, css, emit, html } from 'fudgel';

component('show-modal', {
    style: css`
.modal-wrapper-outer {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

.modal-wrapper-inner {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: min(100%, 1024px);
    max-height: 100%;
}

.modal-content {
    background: var(--page-background);
    padding: 20px;
    border-radius: 0.8em;
    position: relative;
    border: var(--modal-border);
    overflow: auto;
    max-height: 80vh;
}

.modal-close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    border: var(--modal-close-border);
    background: var(--modal-close-background);
    border-radius: 0.5em;
    color: var(--modal-close-color);
    font-size: 1.6em;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.scrollable {
    overflow-y: auto;
}
    `,
    template: html`
    <div class="modal-wrapper-outer" @keypress.esc="close()" @click="close()">
        <div class="modal-wrapper-inner">
            <div class="modal-content" @click.stop="">
                <slot />
            </div>
            <div class="modal-close" @click="close()">
               ✕
            </div>
        </div>
    </div>
    `,
}, class {
    close() {
        emit(this, 'close');
    }
});
