/**
 * Base component class that extends HTMLElement for creating custom web components.
 * Provides core functionality for rendering and element creation.
 */
export class Component extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Lifecycle method called when the component is added to the DOM.
   * Triggers initial render of the component.
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Abstract method that must be implemented by child components.
   * Handles the component's rendering logic.
   * @throws {Error} If child component doesn't implement render method
   */
  render() {
    throw new Error('Component must implement render method');
  }

  /**
   * Utility method for creating DOM elements with attributes and children.
   * @param {string} tag - HTML tag name
   * @param {Object} attributes - Key-value pairs of element attributes
   * @param {Array} children - Array of child nodes or text content
   * @returns {HTMLElement} The created DOM element
   */
  createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);

    // Set attributes and event listeners
    Object.entries(attributes).forEach(([key, value]) => {
      if (key.startsWith('on')) {
        // Convert 'onClick' to 'click' event listener
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    });

    // Append children (text nodes or elements)
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  }
}
