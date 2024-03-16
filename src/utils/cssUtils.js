/**
 * Utility helper for CSS modules
 * @param {string} htmlString HTML raw string template
 * @param {object} styles The object containing the styles class used for this specific template
 * @returns HTML raw string with template interpolation with styles
 */
export function bindStyles(htmlString, styles) {
    const stylesKeys = Object.keys(styles)
    if (!stylesKeys || stylesKeys.length === 0)
        return htmlString

    const cssModuleClassNames = stylesKeys.join("|");
    const classNamesRegex = new RegExp(cssModuleClassNames, "gi");
    const templateWithClassNames = htmlString.replace(
        classNamesRegex,
        (matched) => styles[matched]
    );
    return templateWithClassNames;
};