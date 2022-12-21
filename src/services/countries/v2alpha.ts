import type { CountriesModel, CountriesResponse } from "@/models/countries";
import { ApiCountriesService } from ".";

  class CountriesService extends ApiCountriesService {
    public getFromCode(code : string) {
      return this.$get<CountriesResponse<CountriesModel>>(`alpha/${code}`);
    }
   
  }
  
  export const countriesService = new CountriesService("v2");
  