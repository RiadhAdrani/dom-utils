import { expect, it, beforeEach, describe, vitest } from 'vitest';
import { addEventListener, removeEvent, setEvent } from '.';
import { createElement } from '../element';
import { DomEventHandler } from '../types';
import { Callback } from '@riadh-adrani/utils';

describe('Event', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    count = 0;
  });

  let count = 0;

  it.each([
    [0, 0, 0],
    ['onclick', 0, 0],
    [0, () => {}, 0],
    [
      'onclick',
      () => {
        count++;
      },
      1,
    ],
    [
      'onClick',
      () => {
        count++;
      },
      1,
    ],
  ])('should add click event', (event, callback, expected) => {
    const el = createElement<HTMLElement>('div');

    setEvent(event as unknown as string, callback as unknown as DomEventHandler, el);
    el.click();

    expect(count).toBe(expected);
  });

  it('should add multi camel cased events (onContextMenu)', () => {
    const el = createElement<HTMLElement>('div');

    const fn = vitest.fn();

    setEvent('onContextMenu', fn, el);

    el.dispatchEvent(new MouseEvent('contextmenu'));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should add multi camel cased events (onMouseOver)', () => {
    const el = createElement<HTMLElement>('div');

    const fn = vitest.fn();

    setEvent('onMouseOver', fn, el);

    el.dispatchEvent(new MouseEvent('mouseover'));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should replace event', () => {
    const el = createElement<HTMLElement>('div');

    const onClick = vitest.fn();
    const onClick2 = vitest.fn();

    setEvent('onClick', onClick, el);
    setEvent('onClick', onClick2, el);

    el.click();

    expect(onClick).toHaveBeenCalledTimes(0);
    expect(onClick2).toHaveBeenCalledTimes(1);
  });

  it('should remove click event', () => {
    const el = createElement<HTMLElement>('div');

    setEvent(
      'onclick',
      () => {
        count++;
      },
      el
    );
    el.click();

    expect(count).toBe(1);

    removeEvent('onclick', el);
    el.click();

    expect(count).toBe(1);
  });

  it('should add event listener to the document', () => {
    const onClick = vitest.fn();

    setEvent('onClick', onClick, document);

    document.body.click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should add event listener to the document', () => {
    const onClick = vitest.fn();

    setEvent('onClick', onClick, document);
    removeEvent('onClick', document);

    document.body.click();

    expect(onClick).toHaveBeenCalledTimes(0);
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

  it('should not throw when event name is invalid but is custom', () => {
    expect(() => addEventListener('click', () => {}, window, true)).not.toThrow();
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
