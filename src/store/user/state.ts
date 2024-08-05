// src/store/modules/auth/state.ts
import { CreateGUI } from 'src/interfaces/components/Grid.interfaces';
import type {
  LoginSuccess,
  AccesUserI,
} from '../../interfaces/auth/Acces.interfaces';

export interface State {
  data: LoginSuccess | null;
  infoAcces: AccesUserI | null;
  permission: CreateGUI | null;
}

export const state: State = {
  data: null,
  infoAcces: {},
  permission: null,
};
