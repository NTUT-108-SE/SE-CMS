import { MutationTree } from "vuex";
import { DashboardState } from "./types";

export const mutations: MutationTree<DashboardState> = {
  setDrawer(state, value: Boolean) {
    state.drawer = value;
  }
};
