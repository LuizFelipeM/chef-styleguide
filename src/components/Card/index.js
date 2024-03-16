import singleSpaHtml from 'single-spa-html';
import Mustache from "mustache"
import template from "./index.html"
import styles from "./styles.css"
import { bindStyles } from '../../utils/cssUtils';
import { toHtmlElement } from '../../utils/htmlUtils';
import { v4 as uuid } from "uuid"

const htmlLifecycles = singleSpaHtml({ template });

export const mount = async (props) => {
    if (!props.domElement)
        throw Error("@Chef/styleguide Card: domElement not provided a valid dom element")

    const renderedTemplate = Mustache.render(template, props)
    const card = toHtmlElement(bindStyles(renderedTemplate, styles))
    card.id = `single-spa-application:@Chef/styleguide/Card/${uuid()}`

    const eventsMap = {
        "on-click": { htmlBinding: "onclick" }
    }

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

    props.domElement.replaceWith(card)
}

export const { bootstrap, unmount } = htmlLifecycles; // export other lifecycles as-is