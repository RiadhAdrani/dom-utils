import { describe, it, expect } from "vitest";
import is from "./isToggledOn";
import { createElement } from "../../element";

describe("isToggledOn", () => {
  it("should retrieve the value of the contenteditable prop (true)", () => {
    const el = createElement("div", { attributes: { contenteditable: true } });

    expect(is("contenteditable", el)).toBe(true);
  });

  it("should retrieve the value of the contenteditable prop (false)", () => {
    const el = createElement("div", { attributes: { contenteditable: false } });

    expect(is("contenteditable", el)).toBe(false);
  });

  it("should return false if attribute is not toggleable", () => {
    const el = createElement("div");

    expect(is("my-prop", el)).toBe(false);
  });
});
