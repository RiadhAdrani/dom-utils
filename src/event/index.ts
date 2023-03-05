import { DomEventHandler } from "../types";

/**
 * check if the given name is an event name.
 * - `onclick` or `oninput` are valid.
 * - `click` or `input` are not valid.
 *
 * @param name event name
 */
export const isOnEventName = (name: string): boolean => {
  if (typeof name !== "string") return false;

  const onEventRegex = /(on)[a-zA-Z]{1,}/;

  if (!onEventRegex.test(name)) {
    return false;
  }

  return true;
};

/**
 * add an event with the given name to the target element.
 * @param name event name.
 * @param callback callback
 * @param element target element
 */
export const setEvent = <T = Event, E = Element>(
  name: string,
  callback: DomEventHandler<E, T>,
  element: E
) => {
  if (element instanceof Element === false) return;
  if (typeof callback !== "function") return;

  if (!isOnEventName(name)) {
    return;
  }

  (element as Record<string, any>)[name.toLocaleLowerCase()] = callback;
};

/**
 * removes given element named event.
 * @param name event name.
 * @param element target element
 */
export const removeEvent = (name: string, element: Element) => {
  if (element instanceof Element === false) return;

  if (!isOnEventName(name)) {
    return;
  }

  (element as any)[name] = null;
};
