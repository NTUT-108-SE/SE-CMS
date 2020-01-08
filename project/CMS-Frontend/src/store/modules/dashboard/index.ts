import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { DashboardState } from "./types";
import { RootState } from "@/store/types";

export const state: DashboardState = {
  drawer: false,
  color: "success",
  image: "https://picsum.photos/1920/1080?random"
};

const namespaced: boolean = true;
export const Dashboard: Module<DashboardState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
