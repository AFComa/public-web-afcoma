import { MutationTree } from 'vuex';
import { State } from './state';
import type { proyectgetI } from '../../interfaces/auth/Acces.interfaces';

export const mutations: MutationTree<State> = {
  SET_VIEW_PROYECT(state, payload: proyectgetI[]) {
    state.viewProyects = payload;
  },
  SET_LIST_PROYECT(state, payload: proyectgetI[]) {
    state.listProyects = payload;
  },
};
