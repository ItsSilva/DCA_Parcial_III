import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export class HomeButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.navigateToHome = this.navigateToHome.bind(this); // Asegurar contexto
    }

    connectedCallback() {
        this.render();
    }

    async navigateToHome() {
        try {
            const response = await navigate(Screens.USER);
            if (response) {
                dispatch(response);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error navigating to home:', error);
            return false;
        }
    }

    render() {
        if (this.shadowRoot) {
            // Limpia el Shadow DOM antes de renderizar
            this.shadowRoot.innerHTML = '';

            // Crea estilos encapsulados
            const style = document.createElement('style');
            style.textContent = `
                .home-button {
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .home-button:hover {
                    background-color: #0056b3;
                }
            `;

            // Crea el botón
            const button = document.createElement('button');
            button.textContent = 'Home';
            button.className = 'home-button';

            // Añade evento al botón
            button.addEventListener('click', this.navigateToHome);

            // Añade los elementos al shadowRoot
            this.shadowRoot.append(style, button);
        }
    }
}

customElements.define('home-button', HomeButton);
export default HomeButton;