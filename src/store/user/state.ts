// src/store/modules/auth/state.ts
import type {
  LoginSuccess,
  AccesUserI,
} from '../../interfaces/auth/Acces.interfaces';

export interface State {
  data: LoginSuccess | null;
  infoAcces: AccesUserI | null;
}

export const state: State = {
  data: null,
  infoAcces: {},
};
