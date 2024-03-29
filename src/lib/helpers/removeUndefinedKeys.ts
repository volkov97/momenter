export function removeUndefinedKeys(obj: { [key: string]: any }) {
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);

  return obj;
}
