import { describe, it, expect } from "vitest";
import get from "./getDomPropertyByAttribute";
import { createElement } from "../../element";

describe("getDomPropertyByAttribute", () => {
  it("should retrieve the value of the className prop", () => {
    const el = createElement("div", { attributes: { class: "test" } });

    expect(get("class", el)).toBe("test");
  });

  it("should retrieve the value of the contentEditable prop", () => {
    const el = createElement("div", { attributes: { contenteditable: true } });

    expect(get("contenteditable", el)).toBe(true);
  });

  it("should return the value of data-field", () => {
    const el = createElement("div", { attributes: { "data-field": "test" } });

    expect(get("data-field", el)).toBe("test");
  });

  it("should return null if attribute cannot be converted to dom prop", () => {
    const el = createElement("div");

    expect(get("my-prop", el)).toBe(undefined);
  });
});
