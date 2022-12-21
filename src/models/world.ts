import type { CommonResponse } from "./xhr";

export interface WorldResponse<T extends WorldRecord> extends CommonResponse {
  data: T;
}
export interface WorldDateResponse<T extends WorldRecord>
  extends CommonResponse {
  data: T[];
  total: number;
}

export interface WorldRecord extends CommonResponse {}

export interface WorldModel extends WorldRecord {
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export interface SummaryModel extends WorldRecord {
  ID: string;
  Message: string;
  Global: GlobalModel;
  Countries: Country[];
  Date: Date;
}

export interface GlobalModel extends WorldRecord {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
}

export interface Premium {}

export interface Country {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
  Premium: Premium;
}
