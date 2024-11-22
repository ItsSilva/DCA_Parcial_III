// import * as components from './components/index';
import { addObserver, appState } from './store/index';
import { Screens } from './types/store';
import './screens/ADMIN';
import './screens/USER';


class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';

            switch (appState.screen) {

                case Screens.ADMIN:
                    const addProducts = this.ownerDocument.createElement('app-add-products');
                    this.shadowRoot.appendChild(addProducts);
                    break;

                case Screens.USER:
                    const modifyProducts = this.ownerDocument.createElement('app-modify-products');
                    this.shadowRoot.appendChild(modifyProducts);
                    break;

                default:
                    break;
            }
            console.log('Current screen:', appState.screen);
        }
    }
}

customElements.define('app-container', AppContainer);