import { MutationTree } from "vuex";
import { UserState, User } from "./types";

export const mutations: MutationTree<UserState> = {
  UserLoaded(state, user: User) {
    state.error = false;
    state.user = user;
  },
  UserError(state) {
    state.error = true;
    state.user = undefined;
  },
  UserLogout(state) {
    state.user = undefined;
    state.error = false;
  }
};
