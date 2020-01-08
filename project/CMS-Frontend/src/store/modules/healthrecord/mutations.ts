import { MutationTree } from "vuex";
import { HealthRecordState, HealthRecord } from "./types";

export const mutations: MutationTree<HealthRecordState> = {
  storeHealthRecord(state, healthrecord: HealthRecord) {
    state.error = false;
    state.healthrecord = healthrecord;
  },
  deleteHealthRecord(state) {
    state.healthrecord = undefined;
    state.error = false;
  }
};
