import { isArray, isObject, capitalize, findKey } from "@riadh-adrani/utils";
import { Arrayable, DomAttribute } from "../types";
import { htmlToDom, toggleableAttributes } from "./const";
import { convertAttributeToDomProperty, isDataAttr, keyFromDataAttr } from "./utils";

/**
 * return if the given attribute is a standard togglable one.
 * @param attribute attribute name
 */
export const isTogglableAttribute = (attribute: string): boolean => {
  return toggleableAttributes.includes(attribute.trim());
};

/**
 * toggle the given attribute.
 * @param attribute name
 * @param value optional force value
 * @param element target element
 */
export const toggleAttribute = (attribute: string, element: Element, value?: boolean): void => {
  const prop = convertAttributeToDomProperty(attribute);

  if (value !== undefined) {
    const $val = value === true;

    element.toggleAttribute(attribute, $val);
    (element as any)[prop] = $val;
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
  if (toggleableAttributes.includes(attribute)) {
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

    if (isDataAttr(attribute)) {
      const key = keyFromDataAttr(attribute) as string;

      (element as HTMLElement).dataset[key] = $value as string;
    } else {
      const prop = convertAttributeToDomProperty(attribute);

      (element as unknown as Record<string, unknown>)[prop] = $value;
    }
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

    if (isDataAttr(attribute)) {
      const key = keyFromDataAttr(attribute) as string;

      delete (element as HTMLElement).dataset[key];
    } else {
      const prop = convertAttributeToDomProperty(attribute);

      delete (element as unknown as Record<string, unknown>)[prop];
    }
  }
};
