const toggleAttributes = [
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
 * return if the given attribute is togglable.
 * @param attribute attribute name
 */
export const isToggleAttribute = (attribute: string) => {
    return toggleAttributes.includes(attribute.trim());
};

/**
 * set the value of an element's attribute with the given name.
 * @param attribute name
 * @param value value
 * @param element target element
 */
export const setAttribute = (attribute: string, value: string | boolean, element: Element) => {
    if (toggleAttributes.includes(attribute)) {
        element.toggleAttribute(attribute, (value as boolean) === true);
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
    if (toggleAttributes.includes(attribute)) {
        element.toggleAttribute(attribute, false);
    } else {
        element.removeAttribute(attribute);
    }
};
