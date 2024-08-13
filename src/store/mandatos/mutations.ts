import { MutationTree } from 'vuex';
import { State } from './state';
import type {
  LoginSuccess,
  AccesUserI,
} from '../../interfaces/auth/Acces.interfaces';
import {
  ColumCreateUserI,
  CreateGUI,
} from 'src/interfaces/components/Grid.interfaces';

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
  SET_ACCES_PERMIS_TABLE(state, payload: CreateGUI) {
    state.TablePermission = payload;
  },
  SET_USERS_PERMIS(state, payload: ColumCreateUserI[]) {
    state.permissionUser = payload;
  },
  SET_SYSAD_PERMIS(state, payload: ColumCreateUserI[]) {
    state.permissionSysadoc = payload;
  },
  SET_MANDAT_PERMIS(state, payload: ColumCreateUserI[]) {
    state.permissionMandatos = payload;
  },
};
