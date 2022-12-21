import axios from "axios";
import type { CommonResponse } from "@/models/xhr";
import type { PlainObject } from "@/models/base";
import { requestParamsFilter } from "@/utils/helper";

const api = axios.create({
  baseURL: "https://restcountries.com",
  timeout: 20000,
});

api.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
api.interceptors.request.use((config) => {
  return config;
});

export class ApiCountriesService {
    private feature: string;

  constructor(feature: string) {
    this.feature = feature;
  }
  // get
  protected $get<T extends CommonResponse>(
    action: string,
    params: PlainObject = {},
    config: PlainObject = {}
  ): Promise<T> {

    return api.get(`/${this.feature}/${action}`, {
      ...config,
      params: requestParamsFilter(params, true),
    });
  }
}
