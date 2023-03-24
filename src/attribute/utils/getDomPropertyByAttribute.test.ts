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
});
