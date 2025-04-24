/**
 * Contact form component with client-side validation and submission handling.
 * Features a responsive layout and real-time error feedback.
 * Integrates with EmailJS for sending emails.
 */

import { Component } from '../Component.js';

export class ContactComponent extends Component {
  constructor() {
    super();
    this.isSubmitting = false;
  }

  connectedCallback() {
    this.render();
  }

  /**
   * Performs client-side validation of form fields.
   * Checks for required fields and proper format of email and phone.
   * @returns {boolean} True if all validations pass, false otherwise
   */
  validateForm() {
    const form = this.querySelector('#contactForm');
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const message = form.querySelector('#message');
    let isValid = true;

    // Reset previous validation state
    this.querySelectorAll('.error-message').forEach((block) => {
      block.textContent = '';
    });
    this.querySelectorAll('.form-control').forEach((field) => {
      field.classList.remove('is-invalid');
    });

    // Name validation
    if (!name.value.trim()) {
      this.showError(name, 'Please enter your name');
      isValid = false;
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      this.showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    // Phone validation with regex (accepts international formats)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone.value)) {
      this.showError(phone, 'Please enter a valid phone number');
      isValid = false;
    }

    // Message validation
    if (!message.value.trim()) {
      this.showError(message, 'Please enter a message');
      isValid = false;
    }

    return isValid;
  }

  /**
   * Displays validation error for a form field.
   * @param {HTMLElement} input - The input field with error
   * @param {string} message - Error message to display
   */
  showError(input, message) {
    input.classList.add('is-invalid');
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
      errorDiv.textContent = message;
    }
  }

  /**
   * Handles form submission.
   * Validates form data and sends email using EmailJS.
   * @param {Event} e - Form submission event
   */
  async handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) {
      return;
    }

    if (!this.validateForm()) {
      return;
    }

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    try {
      this.isSubmitting = true;
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Sending...
      `;

      // Hide any previous error messages
      const errorDiv = this.querySelector('#error-message');
      errorDiv.classList.add('d-none');

      // Prepare email data
      const templateParams = {
        to_email: 'mo.rezk06@gmail.com',
        from_name: form.querySelector('#name').value,
        from_email: form.querySelector('#email').value,
        reply_to: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        message: form.querySelector('#message').value,
      };

      // Send email using EmailJS
      await emailjs.send('service_d009rcg', 'template_rejpmll', templateParams);

      this.showSuccess();
    } catch (error) {
      console.error('Failed to send email:', error);
      const errorDiv = this.querySelector('#error-message');
      errorDiv.textContent = 'Failed to send message. Please try again later.';
      errorDiv.classList.remove('d-none');
    } finally {
      this.isSubmitting = false;
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  }

  /**
   * Displays success message and resets form.
   * Message auto-hides after 5 seconds.
   */
  showSuccess() {
    const success = this.querySelector('#success-message');
    success.classList.remove('d-none');
    this.querySelector('#contactForm').reset();

    setTimeout(() => {
      success.classList.add('d-none');
    }, 5000);
  }

  /**
   * Renders the contact form with Bootstrap styling.
   * Sets up event listeners for form submission.
   */
  render() {
    const section = document.createElement('section');
    section.id = 'contact';
    section.className = 'py-5';

    section.innerHTML = `
      <div class="container py-5">
        <div class="text-center mb-5">
          <h2 class="display-4 fw-bold mb-3">
            Contact
            <span class="text-primary">.</span>
          </h2>
          <p class="lead text-secondary">
            Get in touch with me for any questions or opportunities.
          </p>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <!-- Success Message -->
            <div id="success-message" class="alert alert-success d-none mb-4" role="alert">
              Your message has been sent successfully! I'll get back to you soon.
            </div>

            <!-- Error Message -->
            <div id="error-message" class="alert alert-danger d-none mb-4" role="alert">
            </div>

            <form id="contactForm" class="needs-validation" novalidate>
              <div class="row g-3">
                <!-- Name Input -->
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" class="form-label">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      class="form-control"
                      required
                    >
                    <div class="invalid-feedback"></div>
                  </div>
                </div>

                <!-- Email Input -->
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="email" class="form-label">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      class="form-control"
                      required
                    >
                    <div class="invalid-feedback"></div>
                  </div>
                </div>

                <!-- Phone Input -->
                <div class="col-12">
                  <div class="form-group">
                    <label for="phone" class="form-label">Your Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      class="form-control"
                      required
                    >
                    <div class="invalid-feedback"></div>
                  </div>
                </div>

                <!-- Message Input -->
                <div class="col-12">
                  <div class="form-group">
                    <label for="message" class="form-label">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      class="form-control"
                      required
                    ></textarea>
                    <div class="invalid-feedback"></div>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="text-center mt-4">
                <button 
                  type="submit"
                  class="btn btn-primary d-inline-flex align-items-center"
                >
                  <span>Send Message</span>
                  <svg class="ms-2" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    // Set up form submission handler
    section
      .querySelector('#contactForm')
      .addEventListener('submit', (e) => this.handleSubmit(e));

    this.innerHTML = '';
    this.appendChild(section);
  }
}
