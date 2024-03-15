export const interpolateTemplate = (template, styles) => {
    console.log('styles', styles)
    const stylesKeys = Object.keys(styles)
    if (!stylesKeys || stylesKeys.length === 0)
        return template

    const cssModuleClassNames = stylesKeys.join("|");
    const classNamesRegex = new RegExp(cssModuleClassNames, "gi");
    console.log('stylesKeys', stylesKeys, 'cssModuleClassNames', cssModuleClassNames, 'classNamesRegex', classNamesRegex)
    const templateWithClassNames = template.replace(
        classNamesRegex,
        (matched) => styles[matched]
    );
    return templateWithClassNames;
};