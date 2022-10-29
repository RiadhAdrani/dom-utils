/**
 * check if the given name is an event name.
 * - `onclick` or `oninput` are valid.
 * - `click` or `input` are not valid.
 *
 * @param name event name
 */
export function isOnEventName(name: string): boolean;

/**
 * add an event with the given name to the target element.
 * @param name event name.
 * @param callback callback
 * @param element target element
 */
export function setEvent(name: string, callback: (e: Event) => void, element: Element): void;

/**
 * remove given element named event.
 * @param name event name.
 * @param element target element
 */
export function removeEvent(name: string, element: Element): void;
