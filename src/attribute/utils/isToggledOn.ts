import getDomPropertyByAttribute from "./getDomPropertyByAttribute";
import isNativeToggleableAttribute from "./isNativeToggleableAttribute";

/**
 * checks if the given attribute is toggleable and toggled on.
 * @param attr attribute
 * @param el source element
 */
const fn = (attr: string, el: Element): boolean => {
  return isNativeToggleableAttribute(attr) && getDomPropertyByAttribute<boolean>(attr, el) === true;
};

export default fn;
