// src/store/modules/auth/getters.ts
import { GetterTree } from 'vuex';
import { State } from './state';

export const getters: GetterTree<State, State> = {
  isLogged: (state) => state.data,
};
