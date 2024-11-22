import AddForm from '../components/addForm/addForm';
import '../components/addForm/addForm';
import { HomeButton } from '../components/homeButton/homeButton';
import '../components/homeButton/homeButton';

class AddProducts extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            // Create a container for the form
            const formContainer = this.ownerDocument.createElement('section');
            formContainer.className = 'form-container';

            const navigateButtonsContainer = this.ownerDocument.createElement('div');
            navigateButtonsContainer.className = 'navigate-buttons-container';
            const homeButton = this.ownerDocument.createElement('home-button') as HomeButton;
            navigateButtonsContainer.appendChild(homeButton);
            formContainer.appendChild(navigateButtonsContainer);

            //  Create an instance of the AddForm component
            const addFormComponent = this.ownerDocument.createElement('event-form') as AddForm;
            formContainer.appendChild(addFormComponent);

            // Append the form container to the shadow root
            this.shadowRoot.appendChild(formContainer);
        }
    }
}

customElements.define('app-add-products', AddProducts);