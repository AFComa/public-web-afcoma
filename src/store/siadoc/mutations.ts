import { MutationTree } from 'vuex';
import { State } from './state';
import type { proyectgetI } from '../../interfaces/auth/Acces.interfaces';

export const mutations: MutationTree<State> = {
  SET_LIST_PROYECTS(state, payload: proyectgetI[]) {
    state.listProyects = payload;
  },
};
