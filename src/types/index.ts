import { StringWithAutoComplete } from "@riadh-adrani/utils";

export type Arrayable<T> = T | Array<T>;

export type DomAttribute = string | boolean | Record<string, unknown> | undefined | null;

export type DomEventTarget<C = HTMLElement> = Element & EventTarget & C;

export type DomEvent<E = Event, C = HTMLElement> = Event &
  E & {
    target: DomEventTarget<HTMLElement>;
    currentTarget: DomEventTarget<C>;
  };

export type DomEventHandler<El = HTMLElement, Ev = Event> = (event: DomEvent<Ev, El>) => void;

export type DomChild = string | number | null | undefined | Element | Text;

export const SVG_NS = "http://www.w3.org/2000/svg";
export const HTML_NS = "http://www.w3.org/1999/xhtml";
export const MATH_NS = "http://www.w3.org/1998/Math/MathML";

export type DomNamespace = typeof SVG_NS | typeof HTML_NS | typeof MATH_NS;

export type DomElementOptions = {
  attributes?: Record<string, Arrayable<DomAttribute>>;
  events?: Record<string, DomEventHandler<any, any>>;
  children?: Arrayable<DomChild>;
  namespace?: DomNamespace;
};

export type DomTagName = StringWithAutoComplete<keyof HTMLElementTagNameMap>;

export type DomEventName = StringWithAutoComplete<`on${keyof DocumentEventMap}`>;
