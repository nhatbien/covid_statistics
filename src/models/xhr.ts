import type { PlainObject } from "./base";

export interface CommonResponse<T = unknown> {
  code: string;
  status: number;
  extra?: PlainObject | null;
  msg?: string;
  data?: T | T[];
}
