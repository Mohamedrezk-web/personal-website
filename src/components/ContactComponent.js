import { Component } from '../Component.js';

export class ContactComponent extends Component {
  constructor() {
    super();
    this.isSubmitting = false;
  }

  connectedCallback() {
    this.render();
  }

  validateForm() {
    const form = this.querySelector('#contactForm');
    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const phone   = form.querySelector('#phone');
    const message = form.querySelector('#message');
    let isValid = true;

    this.querySelectorAll('.field-error').forEach((el) => (el.textContent = ''));
    this.querySelectorAll('.form-input').forEach((el) => el.classList.remove('form-input--error'));

    if (!name.value.trim()) {
      this.showError(name, 'Please enter your name');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      this.showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone.value)) {
      this.showError(phone, 'Please enter a valid phone number');
      isValid = false;
    }

    if (!message.value.trim()) {
      this.showError(message, 'Please enter a message');
      isValid = false;
    }

    return isValid;
  }

  showError(input, message) {
    input.classList.add('form-input--error');
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains('field-error')) {
      errorEl.textContent = message;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.isSubmitting) return;
    if (!this.validateForm()) return;

    const form         = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalHTML = submitButton.innerHTML;

    try {
      this.isSubmitting = true;
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      submitButton.innerHTML = `
        <span class="btn-spinner"></span>
        <span>Sending…</span>
      `;

      this.querySelector('#error-message').classList.add('ds-hidden');

      const templateParams = {
        to_email:   'mo.rezk06@gmail.com',
        from_name:  form.querySelector('#name').value,
        from_email: form.querySelector('#email').value,
        reply_to:   form.querySelector('#email').value,
        phone:      form.querySelector('#phone').value,
        message:    form.querySelector('#message').value,
      };

      await emailjs.send('service_d009rcg', 'template_rejpmll', templateParams);
      this.showSuccess();
    } catch (error) {
      console.error('Failed to send email:', error);
      const errorDiv = this.querySelector('#error-message');
      errorDiv.textContent = 'Failed to send message. Please try again later.';
      errorDiv.classList.remove('ds-hidden');
    } finally {
      this.isSubmitting = false;
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = originalHTML;
    }
  }

  showSuccess() {
    const success = this.querySelector('#success-message');
    success.classList.remove('ds-hidden');
    this.querySelector('#contactForm').reset();
    setTimeout(() => success.classList.add('ds-hidden'), 5000);
  }

  render() {
    const section = document.createElement('section');
    section.id = 'contact';
    section.className = 'cc-section';

    section.innerHTML = `
      <!-- Ambient -->
      <div class="section-ambient" aria-hidden="true"></div>
      <div class="section-grid"   aria-hidden="true"></div>

      <!-- Shapes -->
      <div class="section-shapes" aria-hidden="true">
        <div class="section-shape shape-cube shape-1"></div>
        <div class="section-shape shape-cube shape-2"></div>
        <div class="section-shape shape-ring shape-3"></div>
        <div class="section-shape shape-sphere shape-4"></div>
      </div>

      <div class="ds-container section-layer">

        <!-- Header -->
        <div class="section-head">
          <div class="section-eyebrow">
            <span class="eyebrow-line"></span>
            <span>Get In Touch</span>
            <span class="eyebrow-line eyebrow-line-r"></span>
          </div>
          <h2 class="section-title">
            Send a <span class="section-title-accent">Message</span>
          </h2>
          <p class="section-subtitle">
            Have a question or opportunity? Drop me a message and I'll get back to you.
          </p>
        </div>

        <div class="form-row">
          <div class="form-inner">

            <!-- Success -->
            <div id="success-message" class="form-alert form-alert--success ds-hidden" role="alert">
              <i class="fas fa-check-circle" aria-hidden="true"></i>
              Message sent! I'll get back to you soon.
            </div>

            <!-- Error -->
            <div id="error-message" class="form-alert form-alert--error ds-hidden" role="alert"></div>

            <div class="form-card">
              <form id="contactForm" novalidate>
                <div class="fields-grid">

                  <div>
                    <label for="name" class="form-label">Your Name</label>
                    <input type="text" id="name" name="name" class="form-input" placeholder="John Doe" required aria-describedby="name-error">
                    <div class="field-error" id="name-error" role="alert"></div>
                  </div>

                  <div>
                    <label for="email" class="form-label">Your Email</label>
                    <input type="email" id="email" name="email" class="form-input" placeholder="john@example.com" required aria-describedby="email-error">
                    <div class="field-error" id="email-error" role="alert"></div>
                  </div>

                  <div class="field-full">
                    <label for="phone" class="form-label">Your Phone</label>
                    <input type="tel" id="phone" name="phone" class="form-input" placeholder="+1 234 567 8900" required aria-describedby="phone-error">
                    <div class="field-error" id="phone-error" role="alert"></div>
                  </div>

                  <div class="field-full">
                    <label for="message" class="form-label">Your Message</label>
                    <textarea id="message" name="message" rows="5" class="form-input form-textarea" placeholder="Tell me about your project…" required aria-describedby="message-error"></textarea>
                    <div class="field-error" id="message-error" role="alert"></div>
                  </div>

                </div>

                <div class="submit-wrap">
                  <button type="submit" class="btn btn--primary" aria-live="polite">
                    <span>Send Message</span>
                    <i class="fas fa-paper-plane" aria-hidden="true"></i>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

    `;

    section.querySelector('#contactForm').addEventListener('submit', (e) => this.handleSubmit(e));

    this.innerHTML = '';
    this.appendChild(section);
  }
}
