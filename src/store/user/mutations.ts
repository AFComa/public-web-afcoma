import { MutationTree } from 'vuex';
import { State } from './state';
import type {
  LoginSuccess,
  AccesUserI,
} from '../../interfaces/auth/Acces.interfaces';
import { CreateGUI } from 'src/interfaces/components/Grid.interfaces';

export const mutations: MutationTree<State> = {
  SET_LOGIN_DATA(state, payload: LoginSuccess) {
    state.data = payload;
  },
  SET_ACCES_DATA(state, payload: AccesUserI) {
    state.infoAcces = payload;
  },
  SET_ACCES_PERMIS(state, payload: CreateGUI) {
    state.permission = payload;
  },
};
