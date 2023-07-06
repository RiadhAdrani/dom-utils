import { StringWithAutoComplete } from '@riadh-adrani/utils';

export type Arrayable<T> = T | Array<T>;

export type DomAttribute = string | number | boolean | Record<string, unknown> | undefined | null;

export type DomEventTarget<C = HTMLElement> = Element & EventTarget & C;

export type DomEvent<E = Event, C = HTMLElement> = Event &
  E & {
    target: DomEventTarget<HTMLElement>;
    currentTarget: DomEventTarget<C>;
  };

export type DomEventHandler<El = HTMLElement, Ev = Event> = (event: DomEvent<Ev, El>) => void;

export type DomChild = string | number | null | undefined | Element | Text;

export enum Namespace {
  SVG = 'http://www.w3.org/2000/svg',
  HTML = 'http://www.w3.org/1999/xhtml',
  MATH = 'http://www.w3.org/1998/Math/MathML',
}

export type DomElementOptions = {
  attributes?: Record<string, Arrayable<DomAttribute>>;
  events?: Record<string, DomEventHandler<any, any>>;
  children?: Arrayable<DomChild>;
  namespace?: Namespace;
};

export type DomTagName = StringWithAutoComplete<keyof HTMLElementTagNameMap>;

export type CamelCasedEventListenerName = `on${Capitalize<keyof DocumentEventMap>}`;

export type LowerEventListenerName = `on${keyof DocumentEventMap}`;

export type DomEventName = StringWithAutoComplete<
  CamelCasedEventListenerName | LowerEventListenerName
>;
