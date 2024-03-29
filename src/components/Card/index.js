import singleSpaHtml from 'single-spa-html';
import template from "./index.html"
import styles from "./styles.css"
import { mountComponent } from '../../utils/htmlUtils';

const htmlLifecycles = singleSpaHtml({ template });

export const mount = async (props) => {
    const card = mountComponent("Card", template, props, styles)
    props.domElement.replaceWith(card)
}

export const { bootstrap, unmount } = htmlLifecycles; // export other lifecycles as-is