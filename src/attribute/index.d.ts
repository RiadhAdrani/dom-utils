/**
 * return if the given attribute is togglable.
 * @param attribute attribute name
 */
export function isToggleAttribute(attribute: string): boolean;

/**
 * set the value of an element's attribute with the given name.
 * @param attribute name
 * @param value value
 * @param element target element
 */
export function setAttribute(attribute: string, value: string | boolean, element: Element): void;

/**
 * remove the element's attribute with the given ame.
 * @param attribute name
 * @param element target element
 */
export function removeAttribute(attribute: string, element: Element): void;
