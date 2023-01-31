import { isArray, isObject } from "@riadh-adrani/utility-js";
import { Arrayable, DomAttribute } from "../types";
import _ from "lodash";

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

/**
 * check if a given attributes is toggled on.
 *
 * If a non-standard toggleable attribute name is provided, it will return false;
 *
 * @param attribute name
 * @param element target element
 */
export const isToggledOn = (attribute: string, element: Element): boolean => {
  return isTogglableAttribute(attribute) && (element as any)[attribute] === true;
};

/**
 * toggle the given attribute.
 * @param attribute name
 * @param value optional force value
 * @param element target element
 */
export const toggleAttribute = (attribute: string, element: Element, value?: boolean): void => {
  if (value !== undefined) {
    element.toggleAttribute(attribute, value === true);
    (element as any)[attribute] = value === true;
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

    if (attribute === "class") {
      (element as any)["className"] = $value;
    } else {
      (element as any)[_.camelCase(attribute)] = $value;
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
  }
};
