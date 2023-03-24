import { toggleableAttributes } from "../const";

export default (attr: string): boolean => {
  return toggleableAttributes.includes(attr);
};
