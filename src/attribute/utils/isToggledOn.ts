import getDomPropertyByAttribute from "./getDomPropertyByAttribute";
import isNativeToggleableAttribute from "./isNativeToggleableAttribute";

export default (attr: string, el: Element): boolean => {
  return isNativeToggleableAttribute(attr) && getDomPropertyByAttribute<boolean>(attr, el) === true;
};
