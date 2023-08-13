import camelCase from 'camelcase';
import { htmlToDom } from '../const.js';

function findKey<T extends object>(
  callback: (key: keyof T, value: T[keyof T]) => boolean,
  object: T
): { key: keyof T; value: T[keyof T] } | undefined {
  for (const k in object) {
    const res = callback(k, object[k]);

    if (res) {
      return { key: k, value: object[k] };
    }
  }

  return undefined;
}

/**
 * convert attribute to dom property
 * @param attr html attribute
 * @returns dom property
 */
const fn = (attr: string): string => {
  // we check if key exist in the htmlToDom map
  const pair = findKey((key, prop) => attr === key || prop === attr, htmlToDom);

  if (pair) {
    return pair.value;
  }

  return camelCase(attr.replace(':', ' '));
};

export default fn;
