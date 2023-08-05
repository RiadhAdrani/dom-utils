import { Callback, cast, hasProperty, isFunction } from '@riadh-adrani/utils';
import { AnyElement, DomEventHandler, DomEventName } from '../types/index.js';
import { errorMessage } from '../utils.js';

export const __Event__Store__ = '__dom__utils__events__store__';

/**
 * check if the given name is an event name.
 * - `onclick` or `oninput` are valid.
 * - `click` or `input` are not valid.
 *
 * @param name event name
 * @deprecated
 */
export const isOnEventName = (name: string): boolean => {
  if (typeof name !== 'string') return false;

  const onEventRegex = /(on)[a-zA-Z]{1,}/;

  if (!onEventRegex.test(name)) {
    return false;
  }

  return true;
};

export const isValidEventName = (name: string): boolean => {
  const regex = /^on[a-zA-Z]+(:((prevent|stop)(-(prevent|stop))?))?$/i;

  return regex.test(name);
};

export const getEventStore = (target: AnyElement): Record<string, Callback> | undefined => {
  return cast<Record<string, unknown>>(target)[__Event__Store__] as Record<string, Callback>;
};

export const registerEvent = (id: string, callback: Callback, target: AnyElement): void => {
  const element = target as unknown as Record<string, unknown>;

  if (!getEventStore(target)) {
    element[__Event__Store__] = {};
  }

  const store = getEventStore(target) as Record<string, Callback>;

  if (store[id]) {
    throw `[DomUtils] Conflict: event with id "${id}" already registered.`;
  }

  store[id] = callback;
};

export const unregisterEvent = (id: string, target: AnyElement): void => {
  const store = getEventStore(target);

  if (!store) {
    throw errorMessage('Unexpected State: unable to unregister event, no store was found.');
  }

  if (!store[id]) {
    throw errorMessage(`Conflict: event with id "${id}" does not exist.`);
  }

  delete store[id];
};

export const hasEvent = (id: string, target: AnyElement): boolean => {
  return hasProperty(getEventStore(target), id);
};

export const getEventById = (id: string, target: AnyElement): Callback | undefined => {
  const store = getEventStore(target);

  if (!store) return undefined;

  return store[id];
};

export interface EventFlags {
  prevent?: boolean;
  stop?: boolean;
}

export const getEventFlags = (key: string): EventFlags => {
  if (!key.includes(':')) {
    return {};
  }

  const flags: EventFlags = {};

  const words = key.substring(key.indexOf(':') + 1).split('-');

  words.forEach((it) => {
    if (it === 'prevent') {
      flags.prevent = true;
    }

    if (it === 'stop') {
      flags.stop = true;
    }
  });

  return flags;
};

export const getEventName = (key: string): string => {
  let name: string = key;

  if (key.includes(':')) {
    name = key.substring(0, key.indexOf(':'));
  }

  return name.slice(2).toLocaleLowerCase();
};

export const createEventCallback = (key: string, ev: (e: Event) => void): ((e: Event) => void) => {
  const { prevent, stop } = getEventFlags(key);

  return (e) => {
    if (prevent) {
      e.preventDefault();
    }

    if (stop) {
      e.stopPropagation();
    }

    ev(e);
  };
};

/**
 * add an event with the given name to the target element.
 *
 * removes the existing event listener with the same id.
 * @param name event name.
 * @param callback callback
 * @param element target element
 * @param id a unique identifier of the event, by default it is generated from the name
 */
export const setEvent = <T = Event, E extends Node = Element>(
  name: string,
  callback: DomEventHandler<E, T>,
  element: E | Document,
  id = name
) => {
  if (!isValidEventName(name)) {
    throw errorMessage(`Unexpected Input: bad event name "${name}"`);
  }

  if (!isFunction(callback)) {
    throw errorMessage(
      `Unexpected Input: expect a callback as a function but got "${typeof callback}"`
    );
  }

  const listener = getEventName(name);

  if (hasEvent(id, element)) {
    removeEvent(id, element);
  }

  const eventCallback = createEventCallback(id, callback as Callback);

  registerEvent(id, eventCallback as Callback, element);

  element.addEventListener(listener, eventCallback);
};

/**
 * removes given element named event.
 * @param name event name.
 * @param element target element
 * @param id necessary if you have implicitly defined an id for your event
 */
export const removeEvent = (name: string, element: AnyElement, id = name) => {
  const listener = getEventName(name);

  const callback = getEventById(id, element);

  if (!callback) {
    throw errorMessage(
      `Unexpected State: cannot remove the missing event "${listener}" with the id "${id}"`
    );
  }

  element.removeEventListener(listener, callback);

  unregisterEvent(id, element);
};

/**
 * add an event with the given name to the target element.
 *
 * @param name event name
 * @param callback event handler
 * @param element target element
 * @param isCustom define if event is custom to tolerate invalid name
 */
export const addEventListener = <T = Event, E extends Node = Element>(
  name: DomEventName,
  callback: DomEventHandler<E, T>,
  element: AnyElement
): Callback => {
  if (!element.addEventListener) {
    throw errorMessage('cannot attach an event listener to the given element.');
  }

  if (!isFunction(callback)) {
    throw errorMessage(
      `Unexpected Input: expect a callback as a function but got "${typeof callback}"`
    );
  }

  if (!isValidEventName(name)) {
    throw errorMessage(`Unexpected Input: bad event name "${name}"`);
  }

  const listener = getEventName(name);

  const removeEvent = () => element.removeEventListener(listener, callback as EventListener);

  element.addEventListener(listener, callback as EventListener);

  return removeEvent;
};
