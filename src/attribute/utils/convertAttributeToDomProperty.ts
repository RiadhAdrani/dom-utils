import { findKey } from "@riadh-adrani/utils";
import camelCase from "camelcase";
import { htmlToDom } from "../const";

export default (attr: string): string => {
  // we check if key exist in the htmlToDom map
  const pair = findKey((key, prop) => attr === key || prop === attr, htmlToDom);

  if (pair) {
    return pair.value;
  }

  return camelCase(attr.replace(":", " "));
};
