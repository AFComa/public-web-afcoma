// src/store/modules/auth/actions.ts
import { ActionTree } from 'vuex';
import { api } from '../../boot/axios';
import type {
  LoginSuccess,
  LoginError,
} from '../../interfaces/auth/Acces.interfaces';

export const actions: ActionTree<LoginSuccess, unknown> = {
  async createMandato({ commit }, info) {
    try {
      const { data } = await api.post<LoginSuccess | LoginError>(
        'mandato/new',
        info
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
  async allMandato({ commit }, item) {
    try {
      const { data } = await api.post('mandato/getallmandatos', item);

      commit('SET_ASSING_MANDATOS', data);
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener los mandato.',
      };
    }
  },
  async asignMandato({ commit }, item) {
    try {
      const { data } = await api.post('mandato/asignatemadato', item);
      commit('data');
      return {
        ok: true,
        token: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al asignar un mandato.',
      };
    }
  },
  async getMandatoId({ commit }, item) {
    try {
      const { data } = await api.post('mandato/informationbyid', { _id: item });
      commit('SET_VIEW_MANDATOS', data);
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al asignar un mandato.',
      };
    }
  },
  async byMandatoUpdate({ commit }, item) {
    try {
      const { data } = await api.post('mandato/editbyid', item);
      commit('data');
      return {
        ok: true,
        resultado: data.msg,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al actualizar el mandato.',
      };
    }
  },
  async validMandatos({ commit }, item) {
    try {
      const { data } = await api.post('mandato/validate', item);
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al actualizar el mandato.',
      };
    }
  },
  async logout({ commit }, item) {
    try {
      const { data } = await api.post('login/logout', item);
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al cerrar sesión.',
      };
    }
  },
  async getReportMandatos({ commit }, item) {
    try {
      const { data } = await api.post('SA/onedrive/checkFilesMandato', {
        identificador: item,
      });
      commit('data');
      return {
        ok: data.error,
        resultado: data.result,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al actualizar el mandato.',
      };
    }
  },
};
