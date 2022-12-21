import type {
  WorldResponse,
  WorldModel,
  WorldDateResponse,
  GlobalModel,
  SummaryModel,
} from "@/models/world";
import { ApiCovidService } from ".";
import type { QueryWorldModel } from "@/models/request";

class WorldService extends ApiCovidService {
  public total() {
    return this.$get<WorldResponse<WorldModel>>("world/total");
  }
  public worldDate(params: QueryWorldModel) {
    return this.$get<WorldDateResponse<GlobalModel>>("world", params);
  }
  public summary() {
    return this.$get<WorldResponse<SummaryModel>>("summary");
  }
}

export const worldService = new WorldService();
