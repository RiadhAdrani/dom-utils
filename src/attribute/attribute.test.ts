import { expect, it, describe } from "vitest";
import { setAttribute, removeAttribute, toggleAttribute, getDomPropertyByAttribute } from ".";
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

  it.each([
    ["checked", "checked"],
    ["contenteditable", "contentEditable"],
    ["disabled", "disabled"],
  ])("should inject 'toggle' attribute : '%s'", (attr) => {
    const el = createElement("input", { attributes: { type: "checkbox" } });

    toggleAttribute(attr, el);

    expect(Array.of(...el.getAttributeNames()).includes(attr)).toBeTruthy();

    toggleAttribute(attr, el);

    expect(Array.of(...el.getAttributeNames()).includes(attr)).toBeFalsy();
  });

  it.each([
    ["checked", "checked", false],
    ["contenteditable", "contentEditable", true],
    ["disabled", "disabled", true],
  ])("should check if an attribute is toggled on or off : '%s'", (attr, prop, value) => {
    const el = createElement("input", { attributes: { type: "checkbox", [attr]: value } });

    expect((el as any)[prop]).toBe(value);
  });

  it.each([
    ["class", "test", "className"],
    ["id", "test", "id"],
  ])("should remove attribute : '%s'", (attribute, value, prop) => {
    const el = createElement("input", { attributes: { type: "checkbox" } });

    setAttribute(attribute, value, el);

    removeAttribute(attribute, el);

    expect(el.getAttribute(attribute)).toBe(null);
    expect((el as any)[prop]).toBe("");

    // test if we can add property after deleting the prop key
    setAttribute(attribute, value, el);
    expect(el.getAttribute(attribute)).toBe(value);
  });

  it("should remove data attribute", () => {
    const el = createElement<HTMLElement>("input", { attributes: { "data-tooltip": "title" } });

    expect(el.dataset.tooltip).toBe("title");

    removeAttribute("data-tooltip", el);

    expect((el as any).dataset.dataTooltip).toBe(undefined);
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

  it("should set attribute with no setter without throwing", () => {
    const el = createElement<SVGSVGElement>("svg", { namespace: "http://www.w3.org/2000/svg" });

    setAttribute("viewBox", "0 0 24 24", el);

    expect(el.getAttribute("viewBox")).toBe("0 0 24 24");
  });

  it("should update attribute with no setter", () => {
    const el = createElement<SVGSVGElement>("svg", {
      namespace: "http://www.w3.org/2000/svg",
      attributes: { viewBox: "0 0 24 24" },
    });

    setAttribute("viewBox", "0 0 100 100", el);

    expect(el.getAttribute("viewBox")).toBe("0 0 100 100");
  });

  it("should remove attribute with no setter", () => {
    const el = createElement<SVGSVGElement>("svg", {
      namespace: "http://www.w3.org/2000/svg",
      attributes: { viewBox: "0 0 24 24" },
    });

    removeAttribute("viewBox", el);

    expect(el.getAttribute("viewBox")).toBe(null);
  });
});
