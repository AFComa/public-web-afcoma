// src/store/modules/auth/state.ts
import type { proyectgetI } from '../../interfaces/auth/Acces.interfaces';

export interface State {
  listProyects: proyectgetI[] | null;
}

export const state: State = {
  listProyects: null,
};
