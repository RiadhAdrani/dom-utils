import { expect, it, describe } from "@jest/globals";
import {
  changeChildPosition,
  createElement,
  createTextNode,
  getElementChildrenCount,
  getElementPosition,
  injectNode,
  isElement,
  isElementInDocument,
  isElementWithinElement,
  isTextNode,
  removeChildAtPosition,
  removeNode,
  replaceNodeWith,
  setTextNodeData,
} from ".";

describe("Element", () => {
  it.each([["text"], [1], [false], [undefined], [{}], [[]], [createElement("p")]])(
    "should refuse falsy element as Text Node : `%s`",
    (element) => {
      expect(isTextNode(element)).toBe(false);
    }
  );

  it("should create and verify a text node", () => {
    expect(isTextNode(createTextNode("text"))).toBe(true);
    expect(isTextNode(document.createTextNode("text"))).toBe(true);
  });

  it("should update text node data", () => {
    const textNode = createTextNode("text");
    setTextNodeData(textNode, "node");
    expect(textNode.data).toBe("node");
  });

  it.each([
    [undefined, false],
    [null, false],
    ["string", false],
    [1, false],
    [[], false],
    [{}, false],
    [createElement("div"), true],
  ])("should check if an object is an element", (input: any, expected: boolean) => {
    expect(isElement(input)).toBe(expected);
  });

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
    [createTextNode("text"), 0, "text"],
  ])("should inject element : '%s'", (element, index, expected) => {
    const el = createElement("div");

    injectNode(element as Element, el, index);

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
    const el = createElement("div", {
      children: [createElement("p"), createElement("p")],
    });

    injectNode(element as Element, el, index);

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

  it.each([[false], [true], [undefined], [null], [1], ["string"], [{}], [[]]])(
    "should return 0 for falsy element children number",
    (el) => {
      expect(getElementChildrenCount(el as any)).toBe(-1);
    }
  );

  it("should returns element children number", () => {
    const empty = createElement("div");
    expect(getElementChildrenCount(empty)).toBe(0);

    const el = createElement("div", { children: createElement("p") });
    expect(getElementChildrenCount(el)).toBe(1);

    const els = createElement("div", {
      children: [createElement("p"), createElement("p")],
    });
    expect(getElementChildrenCount(els)).toBe(2);
  });

  it.each([
    [0, "<div><p></p><p></p></div>"],
    [1, "<div><p></p><p></p></div>"],
    [2, "<div><p></p><p></p></div>"],
    [3, "<div><p></p><p></p><p></p></div>"],
  ])(
    "should remove child at a given position '%s' => '%s'",
    (position: number, expected: string) => {
      const el = createElement("div", {
        children: [createElement("p"), createElement("p"), createElement("p")],
      });

      removeChildAtPosition(el, position);

      expect(el.outerHTML).toBe(expected);
    }
  );

  it.each([
    [0, "<div><p></p><p></p></div>"],
    [1, "<div><p></p><p></p></div>"],
    [2, "<div><p></p><p></p></div>"],
    [3, "<div><p></p><p></p><p></p></div>"],
  ])(
    "should remove child at a given position '%s' => '%s'",
    (position: number, expected: string) => {
      const el = createElement("div", {
        children: [createElement("p"), createElement("p"), createElement("p")],
      });

      removeChildAtPosition(el, position);

      expect(el.outerHTML).toBe(expected);
    }
  );

  it("should change the position of an element", () => {
    const child = createElement("p");
    let parent = createElement("div", { children: child });
    changeChildPosition(child, 5);
    expect(parent.innerHTML).toBe("<p></p>");

    const child1 = createElement("p");
    const child2 = createElement("span");
    const child3 = createElement("p");
    parent = createElement("div", { children: [child1, child2, child3] });
    changeChildPosition(child2, 0);
    expect(parent.innerHTML).toBe("<span></span><p></p><p></p>");

    parent = createElement("div", { children: [child1, child2, child3] });
    changeChildPosition(child2, 5);
    expect(parent.innerHTML).toBe("<p></p><p></p><span></span>");
  });

  it("should remove elements", () => {
    let parent: Element;

    const child1 = createElement("p");
    const child2 = createElement("span");
    const child3 = createElement("p");
    parent = createElement("div", { children: [child1, child2, child3] });
    removeNode(child2);
    expect(parent.innerHTML).toBe("<p></p><p></p>");

    parent = createElement("div", { children: [child1, child2, child3] });
    removeNode(child1);
    expect(parent.innerHTML).toBe("<span></span><p></p>");
  });

  it("should replace elements", () => {
    let child: any = createElement("p");
    let newChild: any = createElement("span");
    let parent = createElement("div", { children: [child] });
    replaceNodeWith(child, newChild);
    expect(parent.innerHTML).toBe("<span></span>");

    child = createTextNode("text");
    newChild = createElement("span");
    parent = createElement("div", { children: [child] });
    replaceNodeWith(child, newChild);
    expect(parent.innerHTML).toBe("<span></span>");

    newChild = createTextNode("text");
    child = createElement("span");
    parent = createElement("div", { children: [child] });
    replaceNodeWith(child, newChild);
    expect(parent.innerHTML).toBe("text");
  });
});
