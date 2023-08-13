import { forEachKey, isArray } from '@riadh-adrani/obj-utils';
import { setAttribute } from '../attribute/index.js';
import { setEvent } from '../event/index.js';
import { AnyElement, DomChild, DomElementOptions, DomTagName } from '../types/index.js';
import { error } from 'console';
import { errorMessage } from '../utils.js';

export const isNode = (o: unknown): boolean => {
  return o instanceof Node;
};

/**
 * Check if the given element is a text node.
 * @param o target
 */
export const isTextNode = (o: unknown): boolean => {
  return o instanceof Text;
};

/**
 * 
 Check if the given object is an HTML element.
 * @param o target 
 */
export const isElement = (o: unknown): boolean => {
  return o instanceof Element;
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
export const createElement = <T = Element>(tag: DomTagName, params?: DomElementOptions): T => {
  if (tag.trim() === '') throw new Error('tag cannot be empty.');

  const ns = params?.namespace ?? 'http://www.w3.org/1999/xhtml';

  const el = document.createElementNS(ns, tag);

  if (params?.attributes) {
    forEachKey((key, value) => setAttribute(key, value, el), params.attributes);
  }

  if (params?.events) {
    forEachKey((key, value) => setEvent(key, value, el), params.events);
  }

  if (params?.children) {
    const normalized = (
      isArray(params.children) ? params.children : [params.children]
    ) as Array<AnyElement>;

    normalized.forEach((child) => {
      injectNode(child, el);
    });
  }

  return el as T;
};

/**
 * Insert an element within a container in a given position.
 * @param element element
 * @param parent containing element
 * @param index the index in which the element will be injected. if the index is larger than the number of the parent's children or is negative, it will be injected at the end.
 */
export const injectNode = (
  element: AnyElement | string | number,
  parent: Element,
  index?: number
): void => {
  let node: AnyElement;

  if (isNode(element)) {
    node = element as Node;
  } else {
    node = createTextNode(element as string);
  }

  if (typeof index === 'number' && index > -1) {
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
export const isElementWithinElement = (element: unknown, parentElement: Element): boolean => {
  if (element instanceof Node === false) return false;
  if (!isElement(parentElement)) return false;

  return parentElement.contains(element as any);
};

/**
 * Check if the body of the document contains the given element.
 * @param element target element
 */
export const isElementInDocument = (element: any): boolean =>
  isElementWithinElement(element, document.body);

/**
 * Return the index of the given element inside its parent container.
 *
 * @throws an error if the element does not have a parent element.
 * @param element target
 */
export const getElementPosition = (element: Element): number =>
  Array.from(element.parentElement!.children).indexOf(element);

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
export const changeChildPosition = (element: Node, newPosition: number): void => {
  if (!isNode(element)) {
    throw errorMessage('Invalid Input: node is not valid');
  }

  const parent = element.parentElement!;

  if (!isNode(parent)) {
    throw errorMessage('Unexpected State: parent is not a valid node');
  }

  injectNode(element, parent, newPosition);
};

/**
 * remove the given node
 * @param node target
 */
export const removeNode = (node: ChildNode) => {
  if (!isNode(node)) {
    throw errorMessage('Invalid Input: node is not valid child');
  }

  node.remove();
};

/**
 * replace the given element with the new one.
 * @param element target element
 * @param newElement replacing element
 */
export const replaceNodeWith = (element: ChildNode, newElement: Node) => {
  if (!isNode(element) || !isNode(newElement)) {
    throw errorMessage(
      'Invalid Input: one or both of "element" and "newElement" is/are not a valid child node/s'
    );
  }

  element.replaceWith(newElement);
};
