import { Component } from '../../Component.js';

export class ContactInfo extends Component {
  constructor() {
    super();
    this.contactInfo = [
      { icon: 'map-marker-alt', text: 'Egypt, Alexandria' },
      { icon: 'phone', text: '+20 1012917701' },
      { icon: 'envelope', text: 'mo.rezk06@gmail.com' },
    ];
  }

  renderContactInfo() {
    return this.contactInfo
      .map(
        (info, index) => `
        <div class="d-flex align-items-center ${index && 'mt-4'}">
          <div class="rounded-circle me-3 p-3 bg-primary bg-opacity-10">
            <i class="fas fa-${info.icon} text-primary"></i>
          </div>
          <span class="text-secondary">${info.text}</span>
        </div>
      `
      )
      .join('');
  }

  render() {
    this.innerHTML = `
      <section class="py-16 mb-5" id="contact">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-3">Contact</h2>
          <div class="max-w-xl mx-auto">
            <div class="p-4 rounded-lg shadow-sm p-6">
              <div class="mb-6">
                ${this.renderContactInfo()}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('contact-info', ContactInfo);
