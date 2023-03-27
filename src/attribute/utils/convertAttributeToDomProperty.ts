import { findKey } from "@riadh-adrani/utils";
import camelCase from "camelcase";
import { htmlToDom } from "../const.js";

/**
 * convert attribute to dom property
 * @param attr html attribute
 * @returns dom property
 */
const fn = (attr: string): string => {
  // we check if key exist in the htmlToDom map
  const pair = findKey((key, prop) => attr === key || prop === attr, htmlToDom);

  if (pair) {
    return pair.value;
  }

  return camelCase(attr.replace(":", " "));
};

export default fn;
