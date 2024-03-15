import singleSpaHtml from 'single-spa-html';
import Mustache from "mustache"
import template from "./index.html"
import styles from "./styles.css"
import { interpolateTemplate } from '../../utils/cssUtils';

const htmlLifecycles = singleSpaHtml({ template });

export const mount = async (props) => {
    if (!props.domElement)
        throw Error("@Chef/styleguide Card: domElement not provided a valid dom element")

    const renderedTemplate = Mustache.render(template, props)
    props.domElement.innerHTML = renderedTemplate
}

export const { bootstrap, unmount } = htmlLifecycles; // export other lifecycles as-is