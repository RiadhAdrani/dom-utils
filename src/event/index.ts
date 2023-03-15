import { isFunction } from "@riadh-adrani/utils";
import { isElement } from "../element";
import { DomEvent, DomEventHandler } from "../types";

export const eventStore = "__dom_control_events__";

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
 *
 * removes the existing event listener.
 * @param name event name.
 * @param callback callback
 * @param element target element
 */
export const setEvent = <T = Event, E extends Object = Element>(
  name: string,
  callback: DomEventHandler<E, T>,
  element: E | Document
) => {
  if (
    !(isElement(element) || element instanceof Document) ||
    !isFunction(callback) ||
    !isOnEventName(name)
  ) {
    return;
  }

  const ev = name.toLocaleLowerCase();
  const listener = ev.slice(2);

  if (!(element as Record<string, any>)[eventStore]) {
    (element as Record<string, any>)[eventStore] = {};
  }

  if ((element as Record<string, any>)[eventStore][ev]) {
    removeEvent(ev, element as unknown as Element);
  }

  (element as Record<string, any>)[eventStore][ev] = (e: DomEvent<T, E>) => callback(e);

  (element as unknown as Element).addEventListener(
    listener,
    (element as Record<string, any>)[eventStore][ev]
  );
};

/**
 * removes given element named event.
 * @param name event name.
 * @param element target element
 */
export const removeEvent = (name: string, element: unknown) => {
  if (!(isElement(element) || element instanceof Document) || !isOnEventName(name)) {
    return;
  }

  const ev = name.toLocaleLowerCase();
  const listener = ev.slice(2);

  const callback = (element as Record<string, any>)[eventStore][ev];

  if (callback) {
    (element as Element).removeEventListener(listener, callback);
  }
};
