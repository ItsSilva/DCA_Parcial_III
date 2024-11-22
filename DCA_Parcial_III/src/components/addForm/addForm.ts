import { dispatch } from "../../store/index";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";
import { addProductAction } from "../../store/actions";

interface Product {
  id: string;
  utitle: string;
  date: string;
  location: string;
  url: string;
  attendees: number;
}

class AddForm extends HTMLElement {
  private credentials: Product;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.credentials = {
      id: this.generateUniqueId(),
      utitle: "",
      date: "",
      location: "",
      url: "",
      attendees: 0,
    };

    // Bind methods to this
    this.submitForm = this.submitForm.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.changeAttendees = this.changeAttendees.bind(this);
  }

  private generateUniqueId(): string {
    // Generate a timestamp-based ID with a random suffix
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
  }

  connectedCallback() {
    this.render();
  }

  changeTitle(e: Event) {
    const input = e.target as HTMLInputElement;
    this.credentials.utitle = input.value;
  }

  changeDate(e: Event) {
    const input = e.target as HTMLInputElement;
    this.credentials.date = input.value;
  }

  changeLocation(e: Event) {
    const input = e.target as HTMLInputElement;
    this.credentials.location = input.value;
  }

  changeUrl(e: Event) {
    const input = e.target as HTMLInputElement;
    this.credentials.url = input.value;
  }

  changeAttendees(e: Event) {
    const input = e.target as HTMLInputElement;
    this.credentials.attendees = Number(input.value);
  }

  validateForm(): boolean {
    if (
      !this.credentials.url ||
      !this.credentials.utitle ||
      !this.credentials.date ||
      !this.credentials.location
    ) {
      alert("Please fill all text fields");
      return false;
    }

    if (isNaN(this.credentials.attendees) || this.credentials.attendees <= 0) {
      alert("Please enter a valid attendees");
      return false;
    }

    return true;
  }

  async submitForm() {
    if (!this.validateForm()) return;

    // Ensure the ID is set before submitting
    if (!this.credentials.id) {
      this.credentials.id = this.generateUniqueId();
    }

    const response = await addProductAction(this.credentials);
    if (response) {
      dispatch(response);
      dispatch(navigate(Screens.ADMIN));
    } else {
      alert("Could not create the product");
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const container = document.createElement("section");
    container.className = "form-container";

    const form = document.createElement("div");
    form.className = "form-div";

    const title = document.createElement("h1");
    title.innerText = "Add New Event    ";
    title.className = "form-title";
    form.appendChild(title);

    // Title Input
    const pTitle = document.createElement("input");
    pTitle.placeholder = "Title";
    pTitle.className = "form-input";
    pTitle.required = true;
    pTitle.addEventListener("change", this.changeTitle);
    form.appendChild(pTitle);

    // Date Input
    const pDate = document.createElement("input");
    pDate.placeholder = "Date";
    pDate.type = "date";
    pDate.className = "form-input";
    pDate.required = true;
    pDate.addEventListener("change", this.changeDate);
    form.appendChild(pDate);

    // Location Input
    const pLocation = document.createElement("input");
    pLocation.placeholder = "Location";
    pLocation.className = "form-input";
    pLocation.required = true;
    pLocation.addEventListener("change", this.changeLocation);
    form.appendChild(pLocation);

    // URL Input
    const pUrl = document.createElement("input");
    pUrl.placeholder = "URL";
    pUrl.type = "url";
    pUrl.className = "form-input";
    pUrl.required = true;
    pUrl.addEventListener("change", this.changeUrl);
    form.appendChild(pUrl);

    // Attendees Input
    const pAttendees = document.createElement("input");
    pAttendees.placeholder = "Attendees";
    pAttendees.type = "number";
    pAttendees.min = "1";
    pAttendees.step = "1";
    pAttendees.className = "form-input";
    pAttendees.required = true;
    pAttendees.addEventListener("change", this.changeAttendees);
    form.appendChild(pAttendees);

    // Save Button
    const save = document.createElement("button");
    save.innerText = "Start now";
    save.className = "form-button";
    save.addEventListener("click", this.submitForm);
    form.appendChild(save);

    container.appendChild(form);
    this.shadowRoot.appendChild(container);
  }
}

customElements.define("event-form", AddForm);
export default AddForm;
