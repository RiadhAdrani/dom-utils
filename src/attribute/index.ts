import { isArray, isObject, capitalize, findKey } from "@riadh-adrani/utils";
import { Arrayable, DomAttribute } from "../types";

const htmlToDom = {
  class: "className",
  accesskey: "accessKey",
  autocapitalise: "autoCapitalize",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  playsinline: "playsInline",
  spellcheck: "spellCheck",
  tabindex: "tabIndex",
  noshade: "noShade",
  hreflang: "hrefLang",
  referrerpolicy: "referrerPolicy",
  datetime: "dateTime",
  autoplay: "autoPlay",
  crossorigin: "crossOrigin",
  ismap: "isMap",
  usemap: "useMap",
  srclang: "srcLang",
  allowfullscreen: "allowFullScreen",
  allowpaymentrequest: "allowPaymentRequest",
  srcdoc: "srcDoc",
  colspan: "colSpan",
  rowspan: "rowSpan",
  autofocus: "autoFocus",
  formaction: "formAction",
  formenctype: "formEncType",
  formmethod: "formMethod",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  acceptcharset: "acceptCharset",
  autocomplete: "autoComplete",
  novalidate: "noValidate",
  dirname: "dirName",
  maxlength: "maxLength",
  readonly: "readOnly",
  minlength: "minLength",
};

export const normalizeToDomProperty = (attribute: string): string => {
  const pair = findKey((key, dom) => attribute === key || attribute === dom, htmlToDom);

  if (pair) {
    return pair.value;
  }

  return attribute;
};

export const togglableAttributes = [
  "contenteditable",
  "autofocus",
  "autoplay",
  "allowfullscreen",
  "allowpaymentreques",
  "checked",
  "controls",
  "compact",
  "disabled",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "open",
  "playsinline",
  "readonly",
  "required",
  "selected",
  "async",
  "defer",
];

/**
 * return if the given attribute is a standard togglable one.
 * @param attribute attribute name
 */
export const isTogglableAttribute = (attribute: string): boolean => {
  return togglableAttributes.includes(attribute.trim());
};

export const getDomProperty = <T = unknown>(prop: string, el: Element): undefined | T => {
  return (el as unknown as Record<string, T | undefined>)[normalizeToDomProperty(prop)];
};

/**
 * check if a given attributes is toggled on.
 *
 * If a non-standard toggleable attribute name is provided, it will return false;
 *
 * @param attribute name
 * @param element target element
 */
export const isToggledOn = (attribute: string, element: Element): boolean => {
  return isTogglableAttribute(attribute) && getDomProperty(attribute, element) === true;
};

/**
 * toggle the given attribute.
 * @param attribute name
 * @param value optional force value
 * @param element target element
 */
export const toggleAttribute = (attribute: string, element: Element, value?: boolean): void => {
  const prop = normalizeToDomProperty(attribute);

  if (value !== undefined) {
    element.toggleAttribute(attribute, value === true);
    (element as any)[prop] = value === true;
  } else {
    element.toggleAttribute(attribute);
  }
};

/**
 * set the value of an element's attribute with the given name.
 * @param attribute name
 * @param value value
 * @param element target element
 */
export const setAttribute = (
  attribute: string,
  value: Arrayable<DomAttribute>,
  element: Element
): void => {
  if (togglableAttributes.includes(attribute)) {
    toggleAttribute(attribute, element, value as boolean);
  } else {
    let $value: DomAttribute = "";

    if (isObject(value) && !isArray(value)) {
      Object.keys(value as Record<string, unknown>).forEach((key: string) => {
        const $v = (value as Record<string, string>)[key];

        const $computed = isArray($v) ? ($v as unknown as Array<string>).join(" ") : $v;

        switch (attribute) {
          case "dataset": {
            setAttribute(`data-${key}`, $computed, element);
            break;
          }
          case "style": {
            ((element as HTMLElement).style as unknown as Record<string, string>)[key] = $computed;
            break;
          }
        }
      });

      return;
    }

    if (isArray(value)) {
      $value = (value as Array<DomAttribute>).join(" ");
    } else {
      $value = value as DomAttribute;
    }

    element.setAttribute(attribute, $value as string);

    // TODO : data-* attribute should pollute dom nodes

    const $attr = attribute
      .split("-")
      .map((t, i) => (i !== 0 ? capitalize(t) : t))
      .join("");

    (element as any)[normalizeToDomProperty($attr)] = $value;
  }
};

/**
 * remove the element's attribute with the given name.
 * @param attribute name
 * @param element target element
 */
export const removeAttribute = (attribute: string, element: Element): void => {
  if (isTogglableAttribute(attribute)) {
    toggleAttribute(attribute, element, false);
  } else {
    element.removeAttribute(attribute);
  }
};
