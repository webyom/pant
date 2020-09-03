import { isDef, isObject } from '.';

type ObjectIndex = Record<string, any>;

const { hasOwnProperty } = Object.prototype;

function assignKey(to: ObjectIndex, from: ObjectIndex, key: string): void {
  const val = from[key];

  if (!isDef(val)) {
    return;
  }

  if (!hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val;
  } else {
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}

export function deepAssign(to: ObjectIndex, from: ObjectIndex): ObjectIndex {
  Object.keys(from).forEach(key => {
    assignKey(to, from, key);
  });

  return to;
}
