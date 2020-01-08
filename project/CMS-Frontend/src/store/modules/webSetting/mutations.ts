import { MutationTree } from "vuex";
import { WebSettingState, WebSetting } from "./types";

export const mutations: MutationTree<WebSettingState> = {
  storeWebSetting(state, webSetting: WebSetting) {
    state.isEmpty = false;
    state.webSetting = webSetting;
  },
  deleteWebSetting(state) {
    state.webSetting = undefined;
    state.isEmpty = true;
  }
};
