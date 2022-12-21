import type { WorldResponse, WorldModel, WorldDateModel, WorldDateResponse } from "@/models/world";
import { ApiCovidService } from ".";
import type { QueryWorldModel } from "@/models/request";

class WorldService extends ApiCovidService {
  public total() {
    return this.$get<WorldResponse<WorldModel>>("/total");
  }
  public worldDate(params: QueryWorldModel) {
    return this.$get<WorldDateResponse<WorldDateModel>>("", params);
  }
}

export const worldService = new WorldService("world");
