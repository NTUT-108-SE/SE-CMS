import { MutationTree } from "vuex";
import { LoaderState } from "./types";

export const mutations: MutationTree<LoaderState> = {
  setOverLay(state, value: Boolean) {
    state.overlay = value;
  }
};
