import { isBlank } from "@riadh-adrani/utility-js";
import { ObjectOf } from "@riadh-adrani/utility-js/types";
import { setAttribute } from "../attribute";
import { setEvent } from "../event";

export type eventHandler<T = Event> = (event: T) => void;

export interface ElementOptions {
    attributes?: ObjectOf<string>;
    events?: ObjectOf<eventHandler>;
    children?: string | Element | Array<string | Element>;
    namespace?: string;
}

export const createElement = <T = Element>(tag: string, params?: ElementOptions): T => {
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
            if (children instanceof Element) {
                injectElement(children, el);
            } else {
                el.innerHTML = children;
            }
        } else {
            children.forEach((child) => {
                injectElement(child, el);
            });
        }
    }

    return el as T;
};

export const injectElement = (element: Element | string, parent: Element, index?: number) => {
    let node: Element | Text;

    if (element instanceof Element === false) {
        node = document.createTextNode(element as string);
    } else {
        node = element as Element;
    }

    if (typeof index === "number" && index > -1) {
        parent.insertBefore(node, parent.children[index]);
    } else {
        parent.append(node);
    }
};

export const isElement = (element: any) => {
    return element instanceof Element;
};

export const isElementWithinElement = (element: any, parentElement: Element) => {
    if (element instanceof Element === false) return false;
    if (parentElement instanceof Element === false) return false;

    return parentElement.contains(element);
};

export const isElementInDocument = (element: any): boolean => {
    return isElementWithinElement(element, document.body);
};

export const getElementPosition = (element: Element) => {
    return Array.from(element.parentElement!.children).indexOf(element);
};
