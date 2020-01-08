import { MutationTree } from "vuex";
import { FinancialState, Financial } from "./types";

export const mutations: MutationTree<FinancialState> = {
  storeFinancial(state, financial: Financial) {
    state.error = false;
    state.financial = financial;
  },
  deleteFinancial(state) {
    state.financial = undefined;
    state.error = false;
  }
};
