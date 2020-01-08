import { MutationTree } from "vuex";
import { BulletinInfoState, BulletinInfo } from "./types";

export const mutations: MutationTree<BulletinInfoState> = {
  storeBulletinInfo(state, bulletinInfo: BulletinInfo) {
    state.isEmpty = false;
    state.bulletinInfo = bulletinInfo;
  },
  deleteBullentinInfo(state) {
    state.bulletinInfo = undefined;
    state.isEmpty = true;
  }
};
