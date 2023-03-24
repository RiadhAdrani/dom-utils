import camelcase from "camelcase";
import isDataAttr from "./isDataAttr";

export default (attr: string): string | undefined => {
  if (!isDataAttr(attr)) {
    return undefined;
  }

  const key = attr.slice("data-".length).replace(":", " ");

  return camelcase(key);
};
