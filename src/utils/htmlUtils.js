/**
 * Convert a raw HTML string to HTML element object
 * @param {string} htmlString HTML String to be converted to HTML Element
 * @returns HTML element
 */
export function toHtmlElement(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}