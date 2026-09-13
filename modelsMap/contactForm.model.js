/**
 * @typedef {Object} ContactFormField
 * @property {string}  id          - HTML element id and name attribute
 * @property {string}  label       - Field label text
 * @property {string}  type        - Input type attribute ("text", "email", "tel", "textarea")
 * @property {string}  placeholder - Placeholder hint text
 * @property {boolean} required    - Whether the field is required
 * @property {string}  errorId     - ID of the associated error message element
 */

/**
 * @typedef {Object} ContactFormPayload
 * @property {string} to_email   - Recipient email (hardcoded to mo.rezk06@gmail.com)
 * @property {string} from_name  - Sender name from the "name" field
 * @property {string} from_email - Sender email from the "email" field
 * @property {string} reply_to   - Same as from_email (for EmailJS reply threading)
 * @property {string} phone      - Sender phone from the "phone" field
 * @property {string} message    - Message body from the "message" field
 */

/**
 * @typedef {Object} ContactFormSection
 * @property {string}              eyebrow    - Section eyebrow label
 * @property {string}              title      - Section heading
 * @property {string}              subtitle   - Section subheading
 * @property {ContactFormField[]}  fields     - Ordered list of form fields
 * @property {string}              serviceId  - EmailJS service ID
 * @property {string}              templateId - EmailJS template ID
 */

/** @type {ContactFormField[]} */
export const contactFormFields = [
  {
    id: "name",
    label: "Your Name",
    type: "text",
    placeholder: "John Doe",
    required: true,
    errorId: "name-error",
  },
  {
    id: "email",
    label: "Your Email",
    type: "email",
    placeholder: "john@example.com",
    required: true,
    errorId: "email-error",
  },
  {
    id: "phone",
    label: "Your Phone",
    type: "tel",
    placeholder: "+1 234 567 8900",
    required: true,
    errorId: "phone-error",
  },
  {
    id: "message",
    label: "Your Message",
    type: "textarea",
    placeholder: "Tell me about your project…",
    required: true,
    errorId: "message-error",
  },
];

/** @type {ContactFormSection} */
export const contactFormSection = {
  eyebrow: "Get In Touch",
  title: "Send a Message",
  subtitle: "Have a question or opportunity? Drop me a message and I'll get back to you.",
  fields: contactFormFields,
  serviceId: "service_d009rcg",
  templateId: "template_rejpmll",
};
