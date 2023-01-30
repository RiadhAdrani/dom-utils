import { expect, it } from "@jest/globals";
import { setAttribute, removeAttribute, toggleAttribute } from ".";
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
