import { expect, it } from "@jest/globals";
import {
    createElement,
    getElementPosition,
    injectElement,
    isElement,
    isElementInDocument,
    isElementWithinElement,
} from ".";

it("should create an element", () => {
    expect(createElement("div").tagName).toBe("DIV");
});

it("should add attributes", () => {
    const el = createElement("div", { attributes: { class: "test" } });

    expect(el.getAttribute("class")).toBe("test");
});

it("should add events", () => {
    let count = 0;

    const el = createElement("div", {
        events: {
            onclick: () => {
                count++;
            },
        },
    });

    (el as HTMLElement).click();

    expect(count).toBe(1);
});

it.each([
    ["", ""],
    ["hello", "hello"],
    [createElement("div"), "<div></div>"],
    [["hello", "world"], "helloworld"],
    [[createElement("p"), createElement("img")], "<p></p><img>"],
    [[createElement("p"), "text", createElement("img")], "<p></p>text<img>"],
])("should add children : '%s'", (children, expected) => {
    const el = createElement("div", { children: children as string });

    expect(el.innerHTML).toBe(expected);
});

it.each([
    ["hello", 0, "hello"],
    [createElement("div"), 0, "<div></div>"],
])("should inject element : '%s'", (element, index, expected) => {
    const el = createElement("div");

    injectElement(element as Element, el, index);

    expect(el.innerHTML).toBe(expected);
});

it.each([
    ["hello", 0, "hello<p></p><p></p>"],
    ["hello", 1, "<p></p>hello<p></p>"],
    ["hello", 5, "<p></p><p></p>hello"],
    ["hello", -5, "<p></p><p></p>hello"],
    [createElement("div"), 0, "<div></div><p></p><p></p>"],
    [createElement("div"), 1, "<p></p><div></div><p></p>"],
    [createElement("div"), 5, "<p></p><p></p><div></div>"],
    [createElement("div"), -1, "<p></p><p></p><div></div>"],
])("should inject element at position : '%s' -> '%s'", (element, index, expected) => {
    const el = createElement("div", { children: [createElement("p"), createElement("p")] });

    injectElement(element as Element, el, index);

    expect(el.innerHTML).toBe(expected);
});

it.each([[undefined], [null], ["string"], [1], [[]], [{}]])(
    "should return false when element is falsy: '%s'",
    (input: any) => {
        expect(isElementWithinElement(input, document.body)).toBe(false);
    }
);

it.each([[undefined], [null], ["string"], [1], [[]], [{}]])(
    "should return false when parent element is falsy: '%s'",
    (input: any) => {
        expect(isElementWithinElement(createElement("div"), input)).toBe(false);
    }
);

it("should affirm element in parent Element", () => {
    const el = createElement("div");

    const parent = createElement("div", { children: [el] });

    expect(isElementWithinElement(el, parent)).toBe(true);
});

it("should affirm element in document", () => {
    const el = createElement("div");

    document.body.append(el);

    expect(isElementInDocument(el)).toBe(true);
});

it.each([
    [undefined, false],
    [null, false],
    ["string", false],
    [1, false],
    [[], false],
    [{}, false],
    [createElement("div"), true],
])("should check if an object is an HTML element", (input: any, expected: boolean) => {
    expect(isElement(input)).toBe(expected);
});

it("should returns element index", () => {
    const el = createElement("div");

    const parent = createElement("div", { children: [el] });

    expect(getElementPosition(el)).toBe(0);
});

it("should returns element index", () => {
    const el1 = createElement("div");
    const el2 = createElement("div");

    const parent = createElement("div", { children: [el1, el2] });

    expect(getElementPosition(el2)).toBe(1);
});
