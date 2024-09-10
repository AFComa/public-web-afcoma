// src/store/modules/auth/state.ts
import {
  ColumCreateUserI,
  CreateGUI,
} from 'src/interfaces/components/Grid.interfaces';
import type {
  AccesUserI,
  UserListAssingI,
} from '../../interfaces/auth/Acces.interfaces';

export interface State {
  infoAcces: AccesUserI | null;
  permission: CreateGUI | null;
  TablePermission: CreateGUI | null;
  permissionUser: ColumCreateUserI[] | null;
  permissionSysadoc: ColumCreateUserI[] | null;
  permissionMandatos: ColumCreateUserI[] | null;
  assingUser: UserListAssingI[] | null;
}

export const state: State = {
  infoAcces: null,
  permission: null,
  TablePermission: null,
  permissionUser: null,
  permissionSysadoc: null,
  permissionMandatos: null,
  assingUser: null,
};
