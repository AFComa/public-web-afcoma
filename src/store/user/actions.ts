// src/store/modules/auth/actions.ts
import { ActionTree } from 'vuex';
import { api } from '../../boot/axios';
import type {
  LoginSuccess,
  LoginError,
  AccesUserI,
} from '../../interfaces/auth/Acces.interfaces';

export const actions: ActionTree<LoginSuccess, unknown> = {
  async loginUser(
    { commit },
    credentials: { usuario: string; password: string; ip: string }
  ) {
    try {
      const { headers } = await api.post<LoginSuccess | LoginError>(
        'login/user',
        credentials
      );
      localStorage.setItem('token', headers.token);
      commit('SET_LOGIN_DATA', { ok: true, token: headers.token });
      return {
        ok: true,
        token: headers.token,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      };
    }
  },

  async accesLogin({ commit }, otp) {
    try {
      const response = await api.post<AccesUserI>('/login/otp', { otp });
      commit('SET_ACCES_DATA', response.data);
      return {
        ok: true,
        token: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al validar el código',
      };
    }
  },
};
