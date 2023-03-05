import { expect, it, beforeEach, describe } from "@jest/globals";
import { removeEvent, setEvent } from ".";
import { createElement } from "../element";
import { DomEvent, DomEventHandler } from "../types";

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
});
