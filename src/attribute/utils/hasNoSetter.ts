import { noSetter } from "../const.js";

/**
 * @deprecated
 */
const fn = (attr: string): boolean => {
  return noSetter.includes(attr);
};

export default fn;
