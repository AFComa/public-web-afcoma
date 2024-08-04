import { MutationTree } from 'vuex';
import { State } from './state';
import type {
  LoginSuccess,
  AccesUserI,
} from '../../interfaces/auth/Acces.interfaces';

export const mutations: MutationTree<State> = {
  SET_LOGIN_DATA(state, payload: LoginSuccess) {
    state.data = payload;
  },
  SET_ACCES_DATA(state, payload: AccesUserI) {
    state.infoAcces = payload;
  },
};
