import { expect, it } from "@jest/globals";
import { setAttribute } from ".";
import { createElement } from "../element";

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

        setAttribute(attr, true, el);

        expect(Array.of(...el.getAttributeNames()).includes(attr)).toBeTruthy();

        setAttribute(attr, false, el);

        expect(Array.of(...el.getAttributeNames()).includes(attr)).toBeFalsy();
    }
);

it.each([
    ["class", "test", null],
    ["id", "test", null],
    ["data-tooltip", "hello", null],
])("should remove attribute : '%s'", (attribute, value, expected) => {
    const el = createElement("input", { attributes: { type: "checkbox" } });

    setAttribute(attribute, value, el);

    expect(el.getAttribute(attribute)).toBe(value);
});
