import { MutationTree } from 'vuex';
import { State } from './state';
import type { MandatosAssingI } from '../../interfaces/auth/Acces.interfaces';

export const mutations: MutationTree<State> = {
  SET_ASSING_MANDATOS(state, payload: MandatosAssingI[]) {
    state.assingMandatos = payload;
  },
  SET_VIEW_MANDATOS(state, payload: MandatosAssingI) {
    state.viewMandatos = payload;
  },
};
