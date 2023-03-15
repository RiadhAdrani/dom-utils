import { expect, it, beforeEach, describe, jest } from "@jest/globals";
import { removeEvent, setEvent } from ".";
import { createElement } from "../element";
import { DomEventHandler } from "../types";

describe("Event", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    count = 0;
  });

  let count = 0;

  it.each([
    [0, 0, 0],
    ["onclick", 0, 0],
    [0, () => {}, 0],
    [
      "onclick",
      () => {
        count++;
      },
      1,
    ],
    [
      "onClick",
      () => {
        count++;
      },
      1,
    ],
  ])("should add click event", (event, callback, expected) => {
    const el = createElement<HTMLElement>("div");

    setEvent(event as unknown as string, callback as unknown as DomEventHandler, el);
    el.click();

    expect(count).toBe(expected);
  });

  it("should add multi camel cased events (onContextMenu)", () => {
    const el = createElement<HTMLElement>("div");

    const fn = jest.fn();

    setEvent("onContextMenu", fn, el);

    el.dispatchEvent(new MouseEvent("contextmenu"));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should add multi camel cased events (onMouseOver)", () => {
    const el = createElement<HTMLElement>("div");

    const fn = jest.fn();

    setEvent("onMouseOver", fn, el);

    el.dispatchEvent(new MouseEvent("mouseover"));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should replace event", () => {
    const el = createElement<HTMLElement>("div");

    const onClick = jest.fn();
    const onClick2 = jest.fn();

    setEvent("onClick", onClick, el);
    setEvent("onClick", onClick2, el);

    el.click();

    expect(onClick).toHaveBeenCalledTimes(0);
    expect(onClick2).toHaveBeenCalledTimes(1);
  });

  it("should remove click event", () => {
    const el = createElement<HTMLElement>("div");

    setEvent(
      "onclick",
      () => {
        count++;
      },
      el
    );
    el.click();

    expect(count).toBe(1);

    removeEvent("onclick", el);
    el.click();

    expect(count).toBe(1);
  });

  it("should add event listener to the document", () => {
    const onClick = jest.fn();

    setEvent("onClick", onClick, document);

    document.body.click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should add event listener to the document", () => {
    const onClick = jest.fn();

    setEvent("onClick", onClick, document);
    removeEvent("onClick", document);

    document.body.click();

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
