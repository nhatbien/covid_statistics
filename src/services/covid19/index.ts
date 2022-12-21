import axios from "axios";
import { message } from "ant-design-vue";
import type { CommonResponse } from "@/models/xhr";
import type { PlainObject } from "@/models/base";
import { requestParamsFilter } from "@/utils/helper";

enum InnerCode {
  Unauthorized = "000001",
  TokenExpired = "000002",
  Forbidden = "000003",
}
const api = axios.create({
  baseURL: "https://api.covid19api.com",
  timeout: 20000,
});

api.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
api.interceptors.request.use((config) => {
  return config;
});
/* 
api.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { code, msg } = res;
    if (code === "0") {
      return Promise.resolve(res);
    } else {
      // inner code handler
      switch (code) {
        case InnerCode.Unauthorized:
        case InnerCode.TokenExpired:
        case InnerCode.Forbidden:
          break;
      }
      if (msg) {
        message.error(msg);
      }
      return Promise.reject(res);
    }
  },
  (error) => {
    console.error(error.response);
    if (error.toString().indexOf("timeout") !== -1) {
      message.error("Bad request");
    } else if (error.response) {
      switch (error.response.status) {
        // http status handler
        case 400: //
          message.error("Bad request");
          break;
        case 401:
          message.error("Bad Auth");
          break;
        case 403:
          message.error("Bad request");
          break;
        case 404:
          message.error("not found");
          break;
        case 502: // bad gateway
        case 503: // service unavailable
        case 504: // gateway timeout
          message.error("Bad request");
          break;
        case 500:
        default:
          const errmsg = error.response.data.message;
          if (errmsg) {
            message.error(errmsg);
          } else {
            message.error("Bad request");
          }
          break;
      }
    }
    return Promise.reject(error.response);
  }
); */

export class ApiCovidService {
/*   private feature: string;

  constructor(feature: string) {
    this.feature = feature;
  }
 */
  // get
  protected $get<T extends CommonResponse>(
    action: string,
    params: PlainObject = {},
    config: PlainObject = {}
  ): Promise<T> {

    return api.get(`/${action}`, {
      ...config,
      params: requestParamsFilter(params, true),
    });
  }
}
