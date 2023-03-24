import convertAttributeToDomProperty from "./convertAttributeToDomProperty";

export default <T = string>(attr: string, el: Element): T | undefined => {
  const prop = convertAttributeToDomProperty(attr);

  return (el as unknown as Record<string, T | undefined>)[prop];
};
