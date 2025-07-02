/**
 * Formats a given Date object into a string in the format of "Month Day, Year", 
 * using the en-US locale.
 * 
 * @param {Date} date - The date to format.
 * 
 * @returns {string} The formatted date string.
 */
export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
}

/**
 * Creates an HTML element with a given tag name, class list, and content.
 * 
 * @param {string} tag - The tag name of the element to create.
 * @param {string} [classList=""] - The class list to add to the element.
 * @param {string} [content=""] - The content to add to the element.
 * 
 * @returns {Element} The created element.
 */
export function createElement(tag, classList = '', content = '') {
  const el = document.createElement(tag);
  if (classList) el.className = classList;
  if (content) el.textContent = content;
  return el;
}
