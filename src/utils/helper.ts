import type { PlainObject } from "@/models/base";
import { isDefined } from "./type";

export function requestParamsFilter(
  obj: PlainObject,
  isArrayToString = false
): PlainObject {
  if (Array.isArray(obj)) {
    return obj;
  } else if (
    Object.prototype.toString
      .call(obj)
      .replace(/\[object\s(\w+)\]/, "$1")
      .toLowerCase() !== "object"
  ) {
    return {};
  }
  const newObj: PlainObject = {};
  Object.keys(obj).forEach((key) => {
    const element = obj[key];
    if (Array.isArray(element)) {
      if (element.length > 0) {
        newObj[key] = isArrayToString ? element.join(",") : [...element];
      }
    } else if (isDefined(element)) {
      newObj[key] = element;
    }
  });
  return newObj;
}
