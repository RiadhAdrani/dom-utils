export const togglableAttributes = [
    "contenteditable",
    "autofocus",
    "autoplay",
    "allowfullscreen",
    "allowpaymentreques",
    "checked",
    "controls",
    "compact",
    "disabled",
    "hidden",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "open",
    "playsinline",
    "readonly",
    "required",
    "selected",
    "async",
    "defer",
];

/**
 * return if the given attribute is a standard togglable one.
 * @param attribute attribute name
 */
export const isTogglableAttribute = (attribute: string) => {
    return togglableAttributes.includes(attribute.trim());
};

/**
 * toggle the given attribute.
 * @param attribute name
 * @param value optional force value
 * @param element target element
 */
export const toggleAttribute = (attribute: string, element: Element, value?: boolean) => {
    if (value !== undefined) {
        element.toggleAttribute(attribute, value === true);
        (element as any)[attribute] = value === true;
    } else {
        element.toggleAttribute(attribute);
    }
};

/**
 * set the value of an element's attribute with the given name.
 * @param attribute name
 * @param value value
 * @param element target element
 */
export const setAttribute = (attribute: string, value: string | boolean, element: Element) => {
    if (togglableAttributes.includes(attribute)) {
        toggleAttribute(attribute, element, value as boolean);
    } else {
        element.setAttribute(attribute, value as string);
        (element as any)[attribute] = value;
    }
};

/**
 * remove the element's attribute with the given ame.
 * @param attribute name
 * @param element target element
 */
export const removeAttribute = (attribute: string, element: Element) => {
    if (togglableAttributes.includes(attribute)) {
        toggleAttribute(attribute, element, false);
    } else {
        element.removeAttribute(attribute);
    }
};
