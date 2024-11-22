import { dispatch } from "../../store";
import { deleteProductAction } from "../../store/actions";
import { Actions } from "../../types/store";

export enum Attribute {
    "uid" = "uid",
}
export class SumButton extends HTMLElement {

    uid?: string;

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue ? newValue : undefined; 
    }   

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            const button = this.ownerDocument.createElement('button');
            button.className = 'sum-button';
            button.addEventListener('click', () => {
                let sum = 0
                const count = sum++
                return count
            });
            button.textContent = `attendees: 0`;
            this.shadowRoot.appendChild(button);
        }
    }
}
customElements.define('sum-button', SumButton);
export default SumButton;