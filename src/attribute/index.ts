import { cast, isArray, isObject } from "@riadh-adrani/utils";
import { Arrayable, DomAttribute } from "../types/index.js";
import {
  convertAttributeToDomProperty,
  hasNoSetter,
  isDataAttr,
  isNativeToggleableAttribute,
  keyFromDataAttr,
} from "./utils/index.js";

export * from "./utils/index.js";

/**
 * toggle the given attribute.
 * @param attr name
 * @param value optional force value
 * @param el target element
 */
export const toggleAttribute = (attr: string, el: Element, value?: boolean): void => {
  const prop = convertAttributeToDomProperty(attr);

  if (value !== undefined) {
    const $val = value === true;

    el.toggleAttribute(attr, $val);

    if (!hasNoSetter(attr)) {
      (el as any)[prop] = $val;
    }
  } else {
    el.toggleAttribute(attr);
  }
};

/**
 * set the value of an element's attribute with the given name.
 * @param attr name
 * @param value value
 * @param el target element
 */
export const setAttribute = (attr: string, value: Arrayable<DomAttribute>, el: Element): void => {
  if (isNativeToggleableAttribute(attr)) {
    toggleAttribute(attr, el, value as boolean);
  } else {
    let $value: DomAttribute = "";

    if (isObject(value) && !isArray(value)) {
      Object.keys(value as Record<string, unknown>).forEach((key: string) => {
        const $v = (value as Record<string, string>)[key];

        const $computed = isArray($v) ? ($v as unknown as Array<string>).join(" ") : $v;

        switch (attr) {
          case "dataset": {
            setAttribute(`data-${key}`, $computed, el);
            break;
          }
          case "style": {
            (cast<HTMLElement>(el).style as unknown as Record<string, string>)[key] = $computed;
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

    el.setAttribute(attr, $value as string);

    if (isDataAttr(attr)) {
      const key = keyFromDataAttr(attr) as string;

      (el as HTMLElement).dataset[key] = $value as string;
    } else {
      try {
        const prop = convertAttributeToDomProperty(attr);

        (el as unknown as Record<string, unknown>)[prop] = $value;
      } catch (e) {}
    }
  }
};

/**
 * remove the element's attribute with the given name.
 * @param attr name
 * @param el target element
 */
export const removeAttribute = (attr: string, el: Element): void => {
  if (isNativeToggleableAttribute(attr)) {
    toggleAttribute(attr, el, false);
  } else {
    el.removeAttribute(attr);

    if (isDataAttr(attr)) {
      const key = keyFromDataAttr(attr) as string;

      delete (el as HTMLElement).dataset[key];
    } else {
      const prop = convertAttributeToDomProperty(attr);

      if (!hasNoSetter(attr)) {
        delete cast<Record<string, unknown>>(el)[prop];
      }
    }
  }
};
