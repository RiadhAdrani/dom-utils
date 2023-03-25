/**
 * checks if the given string is a `data-*` attribute
 * @param attr attribute
 */
const fn = (attr: string): boolean => {
  const regEx = /data-(\S+)/;

  return regEx.test(attr);
};

export default fn;
