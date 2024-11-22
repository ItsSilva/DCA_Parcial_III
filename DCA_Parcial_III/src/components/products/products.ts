import { addObserver, appState, dispatch } from "../../store/index";
import DeleteButton, {
  Attribute as DeleteAttribute,
} from "../deleteButton/deleteButton";
import "../deleteButton/deleteButton";
import SumButton, {
    Attribute as SumAttribute,
  } from "../sumButton/sumButton";
  import "../sumButton/sumButton";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";

export enum AttributeProducts {
  "uid" = "uid",
  "utitle" = "utitle",
  "date" = "date",
  "location" = "location",
  "url" = "url",
  "attendees" = "attendees",
}

class Products extends HTMLElement {
  uid?: string;
  utitle?: string;
  date?: string;
  location?: string;
  url?: string;
  attendees?: number;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return Object.keys(AttributeProducts) as Array<AttributeProducts>;
  }

  attributeChangedCallback(
    propName: AttributeProducts,
    oldValue: string | number | undefined,
    newValue: string | number | undefined
  ) {
    switch (propName) {
      case AttributeProducts.url:
        this.url = newValue as string;
        break;
      case AttributeProducts.uid:
        this.uid = newValue as string;
        break;
      case AttributeProducts.utitle:
        this.utitle = newValue as string;
        break;
      case AttributeProducts.date:
        this.date = newValue as string;
        break;
      case AttributeProducts.location:
        this.location = newValue as string;
        break;
      case AttributeProducts.attendees:
        this.attendees = newValue ? Number(newValue) : 0; // Convert to number
        break;
      default:
        break;
    }
    this.render();
  }

  connectedCallback() {
    this.render();
    addObserver(this);
  }
  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = "";
      const container = this.ownerDocument.createElement("div");
      container.className = "event-card";

      const img = this.ownerDocument.createElement("img");
      img.className = "products-img";
      img.src = this.url || "No image available";
      img.alt = this.utitle || "No utitle available";
      container.appendChild(img);

      const utitle = this.ownerDocument.createElement("h2");
      utitle.className = "products-utitle";
      utitle.textContent = this.utitle || "No utitle available";
      container.appendChild(utitle);

      const date = this.ownerDocument.createElement("p");
      date.className = "products-date";
      date.textContent = this.date || "No date available";
      container.appendChild(date);

      const location = this.ownerDocument.createElement("p");
      location.className = "products-location";
      location.textContent = this.location || "No location available";
      container.appendChild(location);

      const attendees = this.ownerDocument.createElement("p");
      attendees.className = "products-attendees";
      attendees.textContent = `attendees: ${this.attendees || 0}`;
      container.appendChild(attendees);



      const deleteButton = this.ownerDocument.createElement(
        "delete-button"
      ) as DeleteButton;
      deleteButton.setAttribute(DeleteAttribute.uid, this.uid || "");
      container.appendChild(deleteButton);

      const sumButton = this.ownerDocument.createElement("sum-button") as SumButton
      container.appendChild(sumButton)

      this.shadowRoot.appendChild(container);
    }
  }
}
customElements.define("event-card", Products);
export default Products;
