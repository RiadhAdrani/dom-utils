import { expect, it } from "@jest/globals";
import { removeAttribute, setAttribute } from ".";
import { createElement } from "../element";

it.each([
    ["class", "test"],
    ["id", "test"],
    ["data-tooltip", "hello"],
])("should inject attribute : '%s'", (attribute, value) => {
    const el = createElement("input", { attributes: { type: "checkbox" } });

    setAttribute(attribute, value, el);

    expect(el.getAttribute(attribute)).toBe(value);
});

it("should inject 'toggle' attribute : '%s'", () => {
    const el = createElement("input", { attributes: { type: "checkbox" } });

    setAttribute("checked", true, el);

    expect(Array.of(...el.getAttributeNames()).includes("checked")).toBeTruthy();

    setAttribute("checked", false, el);

    expect(Array.of(...el.getAttributeNames()).includes("checked")).toBeFalsy();
});

it.each([
    ["class", "test", null],
    ["id", "test", null],
    ["data-tooltip", "hello", null],
])("should remove attribute : '%s'", (attribute, value, expected) => {
    const el = createElement("input", { attributes: { type: "checkbox" } });

    setAttribute(attribute, value, el);

    expect(el.getAttribute(attribute)).toBe(value);
});
