import { MutationTree } from "vuex";
import { PatientState, Patient } from "./types";

export const mutations: MutationTree<PatientState> = {
  storePatient(state, patient: Patient) {
    state.isEmpty = false;
    state.patient = patient;
  },
  deletePatient(state) {
    state.patient = undefined;
    state.isEmpty = true;
  }
};
