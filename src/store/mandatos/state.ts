// src/store/modules/auth/state.ts
import {
  ColumCreateUserI,
  CreateGUI,
} from 'src/interfaces/components/Grid.interfaces';
import type {
  LoginSuccess,
  AccesUserI,
} from '../../interfaces/auth/Acces.interfaces';

export interface State {
  data: LoginSuccess | null;
  infoAcces: AccesUserI | null;
  permission: CreateGUI | null;
  TablePermission: CreateGUI | null;
  permissionUser: ColumCreateUserI[] | null;
  permissionSysadoc: ColumCreateUserI[] | null;
  permissionMandatos: ColumCreateUserI[] | null;
}

export const state: State = {
  data: null,
  infoAcces: null,
  permission: null,
  TablePermission: null,
  permissionUser: null,
  permissionSysadoc: null,
  permissionMandatos: null,
};
