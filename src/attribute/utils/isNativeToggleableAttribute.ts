import { toggleableAttributes } from "../const";

/**
 * checks if the given attribute is natively toggleable.
 * @param attr attribute
 */
const fn = (attr: string): boolean => {
  return toggleableAttributes.includes(attr);
};

export default fn;
