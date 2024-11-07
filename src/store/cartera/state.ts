// src/store/modules/auth/state.ts
import type { MandatosAssingI } from '../../interfaces/auth/Acces.interfaces';

export interface State {
  assingMandatos: MandatosAssingI[] | null;
  viewMandatos: MandatosAssingI | null;
  validMandatos: MandatosAssingI[] | null;
}

export const state: State = {
  assingMandatos: null,
  viewMandatos: null,
  validMandatos: null,
};
