/**
 * Element Class
 *
 * DOM element wrapper with methods for interaction, shadow DOM access,
 * and position calculation with iframe offsets
 */
/**
 * Element class - wraps a DOM element with helper methods
 */
export class Element {
    tab;
    nodeId;
    backendNodeId;
    _frameId = null;
    _iframeOffset = { x: 0, y: 0 };
    constructor(tab, nodeId, backendNodeId) {
        this.tab = tab;
        this.nodeId = nodeId;
        this.backendNodeId = backendNodeId;
    }
    /**
     * Set frame ID for iframe elements
     */
    setFrameId(frameId) {
        this._frameId = frameId;
    }
    /**
     * Get frame ID if this is an iframe
     */
    get frameId() {
        return this._frameId;
    }
    /**
     * Check if this element is an iframe
     */
    get isIframe() {
        return this._frameId !== null;
    }
    /**
     * Send CDP command
     */
    async send(method, params = {}) {
        return this.tab.send(method, params);
    }
    // ============= Properties =============
    /**
     * Get element text content
     */
    async getText() {
        return this.runJs('function () { return this.textContent || this.innerText || "" }');
    }
    /**
     * Get text (alias)
     */
    get text() {
        return this.getText();
    }
    /**
     * Get inner HTML
     */
    async getHtml() {
        return this.runJs('function () { return this.innerHTML }');
    }
    /**
     * Get outer HTML
     */
    async getOuterHtml() {
        const result = await this.send('DOM.getOuterHTML', { nodeId: this.nodeId });
        return result.outerHTML;
    }
    /**
     * Get attribute value
     */
    async getAttribute(name) {
        return this.runJs(`function () { return this.getAttribute("${name}") }`);
    }
    /**
     * Get all attributes
     */
    async getAttributes() {
        const result = await this.send('DOM.getAttributes', { nodeId: this.nodeId });
        const attrs = {};
        for (let i = 0; i < result.attributes.length; i += 2) {
            attrs[result.attributes[i]] = result.attributes[i + 1];
        }
        return attrs;
    }
    /**
     * Get tag name
     */
    async getTagName() {
        return this.runJs('function () { return el.tagName.toLowerCase() }');
    }
    // ============= Bounding Rect - CRITICAL FOR CLOUDFLARE =============
    /**
     * Get bounding client rect
     */
    async getBoundingRect() {
        const result = await this.runJs(`function () {
            const rect = this.getBoundingClientRect();
            return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        }`);
        return result || { x: 0, y: 0, width: 0, height: 0 };
    }
    /**
     * Get bounding rect with iframe offset
     * This is critical for clicking elements inside iframes (Cloudflare checkbox)
     */
    async getBoundingRectWithIframeOffset() {
        const rect = await this.getBoundingRect();
        return {
            x: rect.x + this._iframeOffset.x,
            y: rect.y + this._iframeOffset.y,
            width: rect.width,
            height: rect.height,
        };
    }
    /**
     * Set iframe offset for nested iframes
     */
    setIframeOffset(x, y) {
        this._iframeOffset = { x, y };
    }
    /**
     * Calculate center point
     */
    async getCenter() {
        const rect = await this.getBoundingRectWithIframeOffset();
        return {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
        };
    }
    // ============= Shadow DOM Access - CRITICAL FOR CLOUDFLARE =============
    /**
     * Get shadow root of this element
     * This is critical for accessing Cloudflare Turnstile checkbox inside shadow DOM
     */
    async getShadowRoot() {
        try {
            // Get the node description
            const result = await this.send('DOM.describeNode', {
                nodeId: this.nodeId,
                depth: 1,
            });
            if (result.node.shadowRoots && result.node.shadowRoots.length > 0) {
                const shadowRoot = result.node.shadowRoots[0];
                // Push the shadow root to frontend
                const pushResult = await this.send('DOM.pushNodesByBackendIdsToFrontend', {
                    backendNodeIds: [shadowRoot.backendNodeId],
                });
                if (pushResult.nodeIds && pushResult.nodeIds[0]) {
                    const shadowElement = new Element(this.tab, pushResult.nodeIds[0], shadowRoot.backendNodeId);
                    // Inherit iframe offset
                    shadowElement.setIframeOffset(this._iframeOffset.x, this._iframeOffset.y);
                    return shadowElement;
                }
            }
            // For iframes, get the content document
            if (this._frameId) {
                return await this.getIframeContent();
            }
        }
        catch (e) {
            console.log('getShadowRoot error:', e);
        }
        return null;
    }
    /**
     * Get iframe content document as an element wrapper
     */
    async getIframeContent() {
        if (!this._frameId)
            return null;
        try {
            // Get the iframe's document node
            const result = await this.send('DOM.getFrameOwner', {
                frameId: this._frameId,
            });
            if (result.nodeId) {
                const iframeRect = await this.getBoundingRect();
                const contentElement = new Element(this.tab, result.nodeId, result.backendNodeId);
                // Set offset for the iframe content
                contentElement.setIframeOffset(this._iframeOffset.x + iframeRect.x, this._iframeOffset.y + iframeRect.y);
                return contentElement;
            }
        }
        catch (e) {
            // Failed to get iframe content
        }
        return null;
    }
    // ============= Queries =============
    /**
     * Query selector within this element
     */
    async select(selector, wait) {
        const startTime = Date.now();
        const timeoutMs = (wait ?? 0) * 1000;
        while (true) {
            try {
                const result = await this.send('DOM.querySelector', {
                    nodeId: this.nodeId,
                    selector,
                });
                if (result.nodeId) {
                    const child = new Element(this.tab, result.nodeId);
                    child.setIframeOffset(this._iframeOffset.x, this._iframeOffset.y);
                    return child;
                }
            }
            catch (e) {
                // Element not found
            }
            if (!wait || Date.now() - startTime > timeoutMs) {
                return null;
            }
            await this.tab.sleep(200);
        }
    }
    /**
     * Query selector all within this element
     */
    async selectAll(selector) {
        try {
            const result = await this.send('DOM.querySelectorAll', {
                nodeId: this.nodeId,
                selector,
            });
            return result.nodeIds.map((id) => {
                const child = new Element(this.tab, id);
                child.setIframeOffset(this._iframeOffset.x, this._iframeOffset.y);
                return child;
            });
        }
        catch (e) {
            return [];
        }
    }
    /**
     * Get element at point relative to this element
     */
    async getElementAtPoint(x, y) {
        const rect = await this.getBoundingRectWithIframeOffset();
        const absX = rect.x + x;
        const absY = rect.y + y;
        const element = await this.tab.getElementAtPoint(absX, absY);
        if (element) {
            element.setIframeOffset(rect.x, rect.y);
        }
        return element;
    }
    // ============= Parent/Children =============
    /**
     * Get parent element
     */
    async getParent() {
        try {
            // Use JavaScript to get parent
            const parentInfo = await this.runJs(`function () {
                const parent = this.parentElement;
                if (!parent) return null;
                return true;
            }`);
            if (parentInfo) {
                // Navigate through DOM tree
                const result = await this.send('DOM.describeNode', {
                    nodeId: this.nodeId,
                    depth: 0,
                });
                if (result.node.parentId) {
                    const parent = new Element(this.tab, result.node.parentId);
                    parent.setIframeOffset(this._iframeOffset.x, this._iframeOffset.y);
                    return parent;
                }
            }
        }
        catch (e) {
            // No parent
        }
        return null;
    }
    /**
     * Get parent (getter alias)
     */
    get parent() {
        return this.getParent();
    }
    // ============= Actions =============
    /**
     * Click the element
     */
    async click(options) {
        const center = await this.getCenter();
        if (options?.skipMove) {
            await this.tab.clickAtPoint(center.x, center.y, true);
        }
        else {
            await this.tab.mouseClick(center.x, center.y);
        }
    }
    /**
     * Move mouse to this element
     */
    async moveMouseHere(isJump = false) {
        const center = await this.getCenter();
        await this.tab.moveMouseToPoint(center.x, center.y, isJump);
    }
    /**
     * Scroll element into view
     */
    async scrollIntoView() {
        await this.runJs('function () { return this.scrollIntoView({ behavior: "smooth", block: "center" }) }');
        await this.tab.sleep(300);
    }
    /**
     * Type into input element
     */
    async type(text) {
        await this.click();
        await this.tab.sleep(100);
        await this.tab.type(text);
    }
    /**
     * Clear input
     */
    async clear() {
        await this.click();
        await this.runJs('function () { this.value = ""; this.dispatchEvent(new Event("input", { bubbles: true })); }');
    }
    /**
     * Focus element
     */
    async focus() {
        await this.send('DOM.focus', { nodeId: this.nodeId });
    }
    // ============= JavaScript Execution =============
    /**
     * Run JavaScript with this element as argument
     */
    async runJs(script) {
        try {
            // Resolve node to object
            const resolveResult = await this.send('DOM.resolveNode', {
                nodeId: this.nodeId,
            });
            const objectId = resolveResult.object.objectId;
            // Call function on the element
            const callResult = await this.send('Runtime.callFunctionOn', {
                functionDeclaration: script,
                objectId,
                returnByValue: true,
                awaitPromise: true,
            });
            if (callResult.exceptionDetails) {
                throw new Error(callResult.exceptionDetails.exception?.description || 'Script error');
            }
            return callResult.result.value;
        }
        catch (e) {
            throw e;
        }
    }
}
/**
 * Calculate center point of a rect
 */
export function calcCenter(rect) {
    return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
    };
}
//# sourceMappingURL=element.js.map
