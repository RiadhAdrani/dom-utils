import { Callback, StringWithAutoComplete, hasProperty, isFunction } from '@riadh-adrani/utils';
import { isElement } from '../element/index.js';
import { DomEvent, DomEventHandler } from '../types/index.js';

export const __Event__Store__ = '__dom__utils__events__store__';

/**
 * check if the given name is an event name.
 * - `onclick` or `oninput` are valid.
 * - `click` or `input` are not valid.
 *
 * @param name event name
 */
export const isOnEventName = (name: string): boolean => {
  if (typeof name !== 'string') return false;

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

  if (!(element as Record<string, any>)[__Event__Store__]) {
    (element as Record<string, any>)[__Event__Store__] = {};
  }

  if ((element as Record<string, any>)[__Event__Store__][ev]) {
    removeEvent(ev, element as unknown as Element);
  }

  (element as Record<string, any>)[__Event__Store__][ev] = (e: DomEvent<T, E>) => callback(e);

  (element as unknown as Element).addEventListener(
    listener,
    (element as Record<string, any>)[__Event__Store__][ev]
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

  const callback = (element as Record<string, any>)[__Event__Store__][ev];

  if (callback) {
    (element as Element).removeEventListener(listener, callback);
  }
};

export type CamelCasedEventListenerName = `on${Capitalize<keyof DocumentEventMap>}`;

export type LowerEventListenerName = `on${keyof DocumentEventMap}`;

export type EventListenerName = StringWithAutoComplete<
  CamelCasedEventListenerName | LowerEventListenerName
>;

/**
 * add an event with the given name to the target element.
 *
 * @param name event name
 * @param callback event handler
 * @param element target element
 * @param isCustom define if event is custom to tolerate invalid name
 */
export const addEventListener = <T = Event, E extends Node = Element>(
  name: EventListenerName,
  callback: DomEventHandler<E, T>,
  element: E | Window,
  isCustom?: boolean
): Callback => {
  if (!element.addEventListener) {
    throw '[DOM-Utils] cannot attach an event listener to the given element.';
  }

  if (!isFunction(callback)) {
    throw '[DOM-Utils] callback is not a function.';
  }

  if (!isOnEventName(name) && !isCustom) {
    throw '[DOM-Utils] invalid event name.';
  }

  const ev = name.toLocaleLowerCase();
  const listener = ev.slice(2);

  const removeEvent = () =>
    element.removeEventListener(isCustom ? name : listener, callback as EventListener);

  element.addEventListener(listener, callback as EventListener);

  return removeEvent;
};
