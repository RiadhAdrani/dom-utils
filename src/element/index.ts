import { isBlank } from "@riadh-adrani/utility-js";
import { setAttribute } from "../attribute";
import { setEvent } from "../event";
import { DomChild, DomElementOptions, DomElementTagName } from "../types";

/**
 * Check if the given element is a text node.
 * @param object target
 */
export const isTextNode = (object: any): boolean => {
  return object instanceof Text;
};

/**
 * 
 Check if the given object is an HTML element.
 * @param object target 
 */
export const isElement = (object: any): boolean => {
  return object instanceof Element;
};

/**
 * create and return a text node with the given data.
 * @param data content
 */
export const createTextNode = (data: string) => {
  return document.createTextNode(data);
};

/**
 * update the content of a text node.
 * @param textNode target
 * @param data new data
 */
export const setTextNodeData = (textNode: Text, data: string) => {
  if (isTextNode(textNode)) {
    textNode.data = data;
  }
};

/**
 * create an element with the given options.
 * @param tag existing or custom tag.
 * @param params element options
 */
export const createElement = <T = Element>(
  tag: DomElementTagName,
  params?: DomElementOptions
): T => {
  if (isBlank(tag)) throw new Error("tag cannot be empty.");

  const ns = params && params.namespace ? params.namespace : "http://www.w3.org/1999/xhtml";

  const el = document.createElementNS(ns, tag);

  if (params && params.attributes) {
    Object.keys(params.attributes as object).forEach((key) => {
      setAttribute(key, params.attributes!![key], el);
    });
  }

  if (params && params.events) {
    Object.keys(params.events as object).forEach((key) => {
      setEvent(key, params.events!![key], el);
    });
  }

  if (params && params.children) {
    const children = params.children;

    if (!Array.isArray(children)) {
      injectNode(children as DomChild, el);
    } else {
      children.forEach((child) => {
        injectNode(child as DomChild, el);
      });
    }
  }

  return el as T;
};

/**
 * Insert an element within a container in a given position.
 * @param element element
 * @param parent containing element
 * @param index the index in which the element will be injected. if the index is larger than the number of the parent's children or is negative, it will be injected at the end.
 */
export const injectNode = (element: DomChild, parent: Element, index?: number): void => {
  let node: Element | Text;

  if (isElement(element) || isTextNode(element)) {
    node = element as Element | Text;
  } else {
    node = createTextNode(element as string);
  }

  if (typeof index === "number" && index > -1) {
    parent.insertBefore(node, parent.children[index]);
  } else {
    parent.append(node);
  }
};

/**
 * Check if the given element is container within the parent element.
 *
 * Text nodes are not detected.
 *
 * @param element target
 * @param parentElement container
 */
export const isElementWithinElement = (element: any, parentElement: Element): boolean => {
  if (element instanceof Node === false) return false;
  if (!isElement(parentElement)) return false;

  return parentElement.contains(element);
};

/**
 * Check if the body of the document contains the given element.
 * @param element target element
 */
export const isElementInDocument = (element: any): boolean => {
  return isElementWithinElement(element, document.body);
};

/**
 * Return the index of the given element inside its parent container.
 *
 * @throws an error if the element does not have a parent element.
 * @param element target
 */
export const getElementPosition = (element: Element): number => {
  return Array.from(element.parentElement!.children).indexOf(element);
};

/**
 * retrieve the number of children within the given element.
 *
 * if `element` is not of type `Element`, -1 will be returned instead.
 *
 * Note that `Text` nodes are not considered as element children.
 *
 * @param element target
 * @returns number of children
 */
export const getElementChildrenCount = (element: Element): number => {
  if (!isElement(element)) return -1;

  return element.childElementCount;
};

/**
 * removes the element's children at the given position and return it if it exists, else it return `false`.
 * @param element parent element
 * @param position child index
 */
export const removeChildAtPosition = (element: Element, position: number): ChildNode | false => {
  if (getElementChildrenCount(element) - 1 < position) return false;

  return element.removeChild(element.childNodes.item(position));
};

/**
 * change the position of the given element inside its parent.
 *
 * if the element is not of type `Element` or does not has a parent, the function will exit.
 *
 * @param element target
 * @param newPosition new position
 */
export const changeChildPosition = (element: Element, newPosition: number): void => {
  if (!isElement(element)) return;

  const parent = element.parentElement!;

  if (!isElement(parent)) return;

  injectNode(element, parent, newPosition);
};

/**
 * remove the given node
 * @param node target
 */
export const removeNode = (node: Element | Text) => {
  if (isElement(node) || isTextNode(node)) {
    node.remove();
  }
};

/**
 * replace the given element with the new one.
 * @param element target element
 * @param newElement replacing element
 */
export const replaceNodeWith = (element: Element | Text, newElement: Element | Text) => {
  if (
    (isElement(element) || isTextNode(element)) &&
    (isElement(newElement) || isTextNode(newElement))
  ) {
    element.replaceWith(newElement);
  }
};
