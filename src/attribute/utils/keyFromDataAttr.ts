import camelcase from "camelcase";
import isDataAttr from "./isDataAttr.js";

/**
 * get key from a data attribute.
 *
 * - `"data-title"` => `"title"`
 *
 * - `"my-attr"` => `undefined`
 *
 * @param attr attribute
 */
const fn = (attr: string): string | undefined => {
  if (!isDataAttr(attr)) {
    return undefined;
  }

  const key = attr.slice("data-".length).replace(":", " ");

  return camelcase(key);
};

export default fn;
