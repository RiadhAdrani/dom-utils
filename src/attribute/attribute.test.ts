import { expect, it, describe } from "@jest/globals";
import { setAttribute, removeAttribute, toggleAttribute } from ".";
import { createElement } from "../element";

describe("Attribute", () => {
  it.each([
    ["class", "test"],
    ["id", "test"],
    ["data-tooltip", "hello"],
    ["height", 50],
  ])("should inject attribute : '%s'", (attribute, value) => {
    const el = createElement("input", { attributes: { type: "checkbox" } });

    setAttribute(attribute, value as string, el);

    expect(el.getAttribute(attribute)).toBe(value.toString());
  });

  it.each([["checked"], ["contenteditable"], ["disabled"]])(
    "should inject 'toggle' attribute : '%s'",
    (attr) => {
      const el = createElement("input", { attributes: { type: "checkbox" } });

      toggleAttribute(attr, el);

      expect(Array.of(...el.getAttributeNames()).includes(attr)).toBeTruthy();

      toggleAttribute(attr, el);

      expect(Array.of(...el.getAttributeNames()).includes(attr)).toBeFalsy();
    }
  );

  it.each([
    ["checked", false],
    ["contenteditable", true],
    ["disabled", true],
  ])("should check if an attribute is toggled on or off : '%s'", (attr, value) => {
    const el = createElement("input", { attributes: { type: "checkbox", [attr]: value } });

    expect((el as any)[attr]).toBe(value);
  });

  it.each([
    ["class", "test"],
    ["id", "test"],
    ["data-tooltip", "hello"],
  ])("should remove attribute : '%s'", (attribute, value) => {
    const el = createElement("input", { attributes: { type: "checkbox" } });

    setAttribute(attribute, value, el);

    removeAttribute(attribute, el);

    expect(el.getAttribute(attribute)).toBe(null);
  });

  it("should add attribute provided as array", () => {
    const el = createElement("button", { attributes: { type: "checkbox" } });

    setAttribute("class", ["btn", "btn-active"], el);
    expect(el.className).toBe("btn btn-active");
  });

  it("should add data-* attribute", () => {
    const el = createElement<HTMLElement>("button");

    setAttribute("data-title", "title", el);

    expect(el.dataset.title).toBe("title");
    expect(el.getAttribute("data-title")).toBe("title");
  });

  it("should accept dataset as Record", () => {
    const el = createElement<HTMLElement>("button");

    setAttribute("dataset", { title: "title", version: 1 }, el);

    expect(el.dataset.title).toBe("title");
    expect(el.getAttribute("data-title")).toBe("title");
    expect(el.dataset.version).toBe("1");
    expect(el.getAttribute("data-version")).toBe("1");
  });

  it("should add style as string", () => {
    const el = createElement<HTMLElement>("button");

    setAttribute("style", "color: red;", el);

    expect(el.style.color).toBe("red");
    expect(el.getAttribute("style")).toBe("color: red;");
  });

  it("should accept style as Record", () => {
    const el = createElement<HTMLElement>("button");

    setAttribute("style", { color: "red" }, el);

    expect(el.style.color).toBe("red");
    expect(el.getAttribute("style")).toBe("color: red;");
  });

  it("should accept style keys as Array", () => {
    const el = createElement<HTMLElement>("button");

    setAttribute("style", { padding: ["0px", "5px"] }, el);

    expect(el.style.padding).toBe("0px 5px");
    expect(el.getAttribute("style")).toBe("padding: 0px 5px;");
  });
});
