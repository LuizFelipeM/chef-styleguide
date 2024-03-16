import Mustache from "mustache"
import { v4 as uuid } from "uuid"
import { bindStyles } from "./cssUtils"

const eventsMap = {
    "on-click": { htmlBinding: "onclick" }
}

/**
 * Create a HTML object with {@link name `name`} based on {@link template `template`} using `Mustache` library
 * @param {string} name Component name
 * @param {string} template Mustache template to be used
 * @param {any} props Object containing the props passed for the component and rendered by Mustache
 * @param {any} styles Object containing the styles module used in this component
 * @returns Built component HTML node
 */
export function mountComponent(name, template, props, styles = {}) {
    if (!props.domElement)
        throw Error(`@Chef/styleguide ${name}: domElement not provided a valid dom element`)

    const renderedTemplate = Mustache.render(template, props)
    const card = toHtmlElement(bindStyles(renderedTemplate, styles))
    card.id = `single-spa-application:@Chef/styleguide/${name}/${uuid()}`

    Object.keys(eventsMap).forEach(event => {
        if (!eventsMap[event])
            throw Error(`Event ${event} not implemented`)

        const elements = card.querySelectorAll(`[${event}]`)
        const { htmlBinding } = eventsMap[event]
        elements.forEach(element => {
            const propsBinding = element.getAttribute(event)
            if (props[propsBinding]) element[htmlBinding] = props[propsBinding]
            element.removeAttribute(event)
        })
    })

    return card
}

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