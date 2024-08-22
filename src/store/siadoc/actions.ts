// src/store/modules/auth/actions.ts
import { ActionTree } from 'vuex';
import { api } from '../../boot/axios';
import type {
  LoginSuccess,
  LoginError,
} from '../../interfaces/auth/Acces.interfaces';

export const actions: ActionTree<LoginSuccess, unknown> = {
  async getProyects({ commit }) {
    try {
      const { data } = await api.post<LoginSuccess | LoginError>(
        'SA/proyectos/get',
        {
          nombre: 'Luis',
          apellido: 'Hernandez',
          perfil: 'Administrador',
        }
      );
      commit('data');
      return {
        ok: true,
        token: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener los proyectos.',
      };
    }
  },
  async allUser({ commit }) {
    try {
      const { data } = await api.get('SA/usuario/getusersselect');

      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener los usuarios.',
      };
    }
  },
  async asignProyects({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/assiguserproyect', item);
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
  async getProyectsId({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/getbyid', { _id: item });
      commit('SET_VIEW_MANDATOS', data);
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
};
