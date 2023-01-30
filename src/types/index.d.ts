import { StringWithAutoComplete } from "@riadh-adrani/utility-js";

export type Arrayable<T> = T | Array<T>;

export type DomAttribute = string | boolean | Record<string, unknown> | undefined | null;

export type DomEventTarget<El = HTMLElement> = EventTarget & El;

export type DomEvent<Ev = Event, El = HTMLElement> = Ev & {
  target: WebEventTarget<HTMLElement>;
  currentTarget: WebEventTarget<El>;
};

export type DomEventHandler<El = HTMLElement, Ev = Event> = (event: DomEvent<Ev, El>) => void;

export type DomChild = string | number | null | undefined | Element | Text;

export type DomNamespace =
  | "http://www.w3.org/2000/svg"
  | "http://www.w3.org/1999/xhtml"
  | "http://www.w3.org/1998/Math/MathML";

export type DomElementOptions<E = Element> = {
  attributes?: Record<string, Arrayable<DomAttribute>>;
  events?: Record<string, DomEventHandler<E>>;
  children?: Arrayable<DomChild>;
  namespace?: DomNamespace;
};

export type DomElementTagName = StringWithAutoComplete<keyof HTMLElementTagNameMap>;
