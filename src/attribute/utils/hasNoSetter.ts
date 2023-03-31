import { noSetter } from "../const.js";

const fn = (attr: string): boolean => {
  return noSetter.includes(attr);
};

export default fn;
