import convertAttributeToDomProperty from "./convertAttributeToDomProperty.js";
import isDataAttr from "./isDataAttr.js";
import keyFromDataAttr from "./keyFromDataAttr.js";

/**
 * retrieve the dom property value by its html attribute counterpart.
 * @param attr html attribute
 * @param el source element
 */
const fn = <T = string>(attr: string, el: Element): T | undefined => {
  if (isDataAttr(attr)) {
    const key = keyFromDataAttr(attr);

    return (el as HTMLElement).dataset[key as string] as T;
  }

  const prop = convertAttributeToDomProperty(attr);

  return (el as unknown as Record<string, T | undefined>)[prop];
};

export default fn;
