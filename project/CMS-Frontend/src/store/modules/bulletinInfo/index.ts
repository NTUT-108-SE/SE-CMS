import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { BulletinInfoState } from "./types";
import { RootState } from "@/store/types";

export const state: BulletinInfoState = {
  bulletinInfo: undefined,
  isEmpty: true
};

const namespaced: boolean = true;
export const BulletinInfo: Module<BulletinInfoState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
