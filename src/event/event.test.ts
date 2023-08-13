import { expect, it, beforeEach, describe, vitest } from 'vitest';
import {
  __Event__Store__,
  addEventListener,
  createEventCallback,
  getEventById,
  getEventFlags,
  getEventName,
  getEventStore,
  hasEvent,
  isValidEventName,
  registerEvent,
  removeEvent,
  setEvent,
  unregisterEvent,
} from '.';
import { createElement } from '../element';
import { errorMessage } from '../utils';
import { Callback } from '@riadh-adrani/type-utils';

describe('Event', () => {
  let fn = vitest.fn();
  let el: HTMLButtonElement;

  beforeEach(() => {
    document.body.innerHTML = '';

    fn = vitest.fn();
    el = createElement<HTMLButtonElement>('button');
  });

  describe('isValidEventName', () => {
    it.each([
      'on',
      'on:prevent',
      'onClick:is',
      'onClick:stop-prevent-is',
      'onClick:stop-prevent-stop',
    ])('should refuse "%s"', (event) => {
      expect(isValidEventName(event)).toBe(false);
    });

    it.each([
      'onclick',
      'onClick',
      'onClick:prevent',
      'onClick:stop',
      'onClick:stop-prevent',
      'onClick:prevent-stop',
      'onContextMenu',
    ])('should accept "%s"', (event) => {
      expect(isValidEventName(event)).toBe(true);
    });
  });

  describe('getEventStore', () => {
    it('should retrieve store', () => {
      const store = { onClick: () => 0 };

      el[__Event__Store__] = store;

      expect(getEventStore(el)).toStrictEqual(store);
    });

    it('should return undefined', () => {
      expect(getEventStore(el)).toStrictEqual(undefined);
    });
  });

  describe('registerEvent', () => {
    it('should register store even when non existing', () => {
      registerEvent('onClick', fn, el);

      expect(getEventStore(el)).toStrictEqual({ onClick: fn });
    });

    it('should append event to store', () => {
      registerEvent('onClick', fn, el);
      registerEvent('onclick', fn, el);

      expect(getEventStore(el)).toStrictEqual({ onClick: fn, onclick: fn });
    });

    it('should throw when event with id already exists', () => {
      registerEvent('onClick', fn, el);
      expect(() => registerEvent('onClick', fn, el)).toThrow();
    });
  });

  describe('unregisterEvent', () => {
    it('should throw when store does not exist', () => {
      const error = errorMessage(
        'Unexpected State: unable to unregister event, no store was found.'
      );

      expect(() => unregisterEvent('onClick', el)).toThrow(error);
    });

    it('should throw when event is not found', () => {
      registerEvent('onmouseup', fn, el);

      const error = errorMessage(`Conflict: event with id "onClick" does not exist.`);

      expect(() => unregisterEvent('onClick', el)).toThrow(error);
    });

    it('should unregister event', () => {
      registerEvent('onClick', fn, el);

      unregisterEvent('onClick', el);

      expect(getEventStore(el)).toStrictEqual({});
    });
  });

  describe('hasEvent', () => {
    it('should return true', () => {
      registerEvent('onclick', fn, el);

      expect(hasEvent('onclick', el)).toBe(true);
    });

    it('should return false', () => {
      expect(hasEvent('onclick', el)).toBe(false);
    });
  });

  describe('getEventById', () => {
    it('should return true', () => {
      registerEvent('onclick', fn, el);

      expect(getEventById('onclick', el)).toStrictEqual(fn);
    });

    it('should return false', () => {
      expect(getEventById('onclick', el)).toBe(undefined);
    });
  });

  describe('getEventFlags', () => {
    it('should return prevent', () => {
      expect(getEventFlags('onClick:prevent')).toStrictEqual({ prevent: true });
    });

    it('should return stop', () => {
      expect(getEventFlags('onClick:stop')).toStrictEqual({ stop: true });
    });

    it('should return prevent & stop', () => {
      expect(getEventFlags('onClick:prevent-stop')).toStrictEqual({ prevent: true, stop: true });
      expect(getEventFlags('onClick:stop-prevent')).toStrictEqual({ prevent: true, stop: true });
    });
  });

  describe('getEventName', () => {
    it.each([
      ['onClick', 'click'],
      ['onMouseUp', 'mouseup'],
      ['onClick:prevent', 'click'],
      ['onClick:stop', 'click'],
      ['onClick:stop-prevent', 'click'],
    ])('should convert "%s" to "%s"', (key, name) => {
      expect(getEventName(key)).toBe(name);
    });
  });

  describe('getEventFlags', () => {
    it.each([
      ['onClick', {}],
      ['onClick:prevent', { prevent: true }],
      ['onClick:stop', { stop: true }],
      ['onClick:stop-prevent', { prevent: true, stop: true }],
      ['onClick:prevent-stop', { prevent: true, stop: true }],
    ])('should convert "%s" to "%s"', (key, expected) => {
      expect(getEventFlags(key)).toStrictEqual(expected);
    });
  });

  describe('createEventCallback', () => {
    it('should create an event callback', () => {
      const event = new Event('click');

      let prevented = false;

      const callback = createEventCallback('onClick', (e) => {
        prevented = e.defaultPrevented;
      });

      callback(event);

      expect(prevented).toBe(false);
    });
  });

  describe('setEvent', () => {
    it('should throw when event name is invalid', () => {
      expect(() => setEvent('on', fn, el)).toThrow(
        errorMessage(`Unexpected Input: bad event name "on"`)
      );
    });

    it('should throw when event callback is not a function', () => {
      expect(() => setEvent('onclick', '' as unknown as Callback, el)).toThrow(
        errorMessage(`Unexpected Input: expect a callback as a function but got "string"`)
      );
    });

    it('should attach event listener', () => {
      setEvent('onClick', fn, el);

      el.click();

      expect(fn).toHaveBeenCalledOnce();
    });

    it('should add event with custom id', () => {
      setEvent('onClick', fn, el, 'on:click');

      expect(hasEvent('on:click', el)).toBe(true);
    });

    describe('stop modifier', () => {
      it('should not stop propagation without modifiers', () => {
        const child = createElement<HTMLButtonElement>('button');

        el.appendChild(child);

        const fn2 = vitest.fn();

        setEvent('onClick', fn, el);
        setEvent('onClick', fn2, child);

        child.click();

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn2).toHaveBeenCalledTimes(1);
      });

      it('should stop propagation with :stop modifier', () => {
        const child = createElement<HTMLButtonElement>('button');

        el.appendChild(child);

        const fn2 = vitest.fn();

        setEvent('onClick', fn, el);
        setEvent('onClick:stop', fn2, child);

        child.click();

        expect(fn).toHaveBeenCalledTimes(0);
        expect(fn2).toHaveBeenCalledTimes(1);
      });

      it('should stop propagation :prevent-stop modifier', () => {
        const child = createElement<HTMLButtonElement>('button');

        el.appendChild(child);

        const fn2 = vitest.fn();

        setEvent('onClick', fn, el);
        setEvent('onClick:prevent-stop', fn2, child);

        child.click();

        expect(fn).toHaveBeenCalledTimes(0);
        expect(fn2).toHaveBeenCalledTimes(1);
      });
    });

    describe('prevent modifier', () => {
      it('should not prevent default behavior without modifier', () => {
        let prevented = false;

        setEvent('onClick', (e) => (prevented = e.defaultPrevented), el);

        el.click();

        expect(prevented).toBe(false);
      });

      it('should prevent default behavior with :prevent modifier', () => {
        let prevented = false;

        setEvent('onClick:prevent', (e) => (prevented = e.defaultPrevented), el);

        el.click();

        expect(prevented).toBe(true);
      });

      it('should prevent default behavior with :prevent-stop modifier', () => {
        let prevented = false;

        setEvent('onClick:prevent-stop', (e) => (prevented = e.defaultPrevented), el);

        el.click();

        expect(prevented).toBe(true);
      });
    });
  });

  describe('removeEvent', () => {
    it('should throw when event is missing', () => {
      expect(() => removeEvent('onClick', el)).toThrow(
        errorMessage(
          `Unexpected State: cannot remove the missing event "click" with the id "onClick"`
        )
      );
    });

    it('should remove listener', () => {
      setEvent('onClick', fn, el);
      removeEvent('onClick', el);

      el.click();

      expect(fn).toHaveBeenCalledTimes(0);
      expect(hasEvent('onClick', el)).toBe(false);
    });

    it('should remove listener with id', () => {
      setEvent('onClick', fn, el, 'on:click');
      removeEvent('onClick', el, 'on:click');

      el.click();

      expect(fn).toHaveBeenCalledTimes(0);
      expect(hasEvent('on:click', el)).toBe(false);
    });
  });
});

describe('addEventListener', () => {
  let handler: Callback;

  beforeEach(() => {
    handler = vitest.fn();
  });

  it.each([0, {}])('should throw when element is invalid: %s', (el) => {
    expect(() => addEventListener('onClick', () => 0, el as Element)).toThrow();
  });

  it('should throw when callback is not a function', () => {
    expect(() => addEventListener('onClick', 0 as unknown as Callback, window)).toThrow();
  });

  it('should throw when event name is invalid', () => {
    expect(() => addEventListener('click', () => {}, window)).toThrow();
  });

  it('should not throw when event name is custom', () => {
    expect(() => addEventListener('onClickGlobal', () => {}, window)).not.toThrow();
  });

  it('should add event to window', () => {
    addEventListener('onclick', handler, window);

    document.body.click();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should add event to an element', () => {
    addEventListener('onclick', handler, document.body);

    document.body.click();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should remove event with returned callback', () => {
    const remove = addEventListener('onclick', handler, document.body);

    remove();
    document.body.click();

    expect(handler).toHaveBeenCalledTimes(0);
  });
});
