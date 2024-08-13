// src/store/modules/auth/actions.ts
import { ActionTree } from 'vuex';
import { api } from '../../boot/axios';
import type {
  LoginSuccess,
  LoginError,
} from '../../interfaces/auth/Acces.interfaces';

export const actions: ActionTree<LoginSuccess, unknown> = {
  async createMandato(
    { commit },
    credentials: { usuario: string; password: string; ip: string }
  ) {
    try {
      const { data } = await api.post<LoginSuccess | LoginError>(
        'mandato/new',
        credentials
      );

      commit('data');
      return {
        ok: true,
        token: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al crear el mandato.',
      };
    }
  },
  async allMandato({ commit }) {
    try {
      const { data } = await api.get('mandato/getallmandatos');

      commit('data');
      return {
        ok: true,
        token: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener los mandato.',
      };
    }
  },
  async asignMandato(
    { commit },
    credentials: { usuario: string; password: string; ip: string }
  ) {
    try {
      const { data } = await api.post('mandato/asignatemadato', credentials);

      commit('data');
      return {
        ok: true,
        token: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio al asignar un mandato.',
      };
    }
  },
};
