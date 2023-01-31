import { StringWithAutoComplete } from "@riadh-adrani/utility-js";

export type Arrayable<T> = T | Array<T>;

export type DomAttribute = string | boolean | Record<string, unknown> | undefined | null;

export type DomEventTarget<C = HTMLElement> = EventTarget & C;

export type DomEvent<E = Event, C = HTMLElement> = E & {
  target: DomEventTarget<HTMLElement>;
  currentTarget: DomEventTarget<C>;
};

export type DomEventHandler<El = HTMLElement, Ev = Event> = (event: DomEvent<Ev, El>) => void;

export type DomChild = string | number | null | undefined | Element | Text;

export type DomNamespace =
  | "http://www.w3.org/2000/svg"
  | "http://www.w3.org/1999/xhtml"
  | "http://www.w3.org/1998/Math/MathML";

export type DomElementOptions = {
  attributes?: Record<string, Arrayable<DomAttribute>>;
  events?: Record<string, DomEventHandler>;
  children?: Arrayable<DomChild>;
  namespace?: DomNamespace;
};

export type DomTagName = StringWithAutoComplete<keyof HTMLElementTagNameMap>;

export type DomEventName = StringWithAutoComplete<`on${keyof DocumentEventMap}`>;
