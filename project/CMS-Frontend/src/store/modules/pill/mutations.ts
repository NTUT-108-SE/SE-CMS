import { MutationTree } from "vuex";
import { PillState, Pill } from "./types";

export const mutations: MutationTree<PillState> = {
  storePill(state, pill: Pill) {
    state.error = false;
    state.pill = pill;
  },
  deletePill(state) {
    state.pill = undefined;
    state.error = false;
  }
};
