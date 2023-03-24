import convertAttributeToDomProperty from "./convertAttributeToDomProperty";
import isDataAttr from "./isDataAttr";
import keyFromDataAttr from "./keyFromDataAttr";

export default <T = string>(attr: string, el: Element): T | undefined => {
  const $el = el as unknown as Record<string, T | undefined>;

  if (isDataAttr(attr)) {
    const key = keyFromDataAttr(attr);

    return (el as HTMLElement).dataset[key as string] as T;
  }

  const prop = convertAttributeToDomProperty(attr);

  return (el as unknown as Record<string, T | undefined>)[prop];
};
