// src/store/modules/auth/actions.ts
import { ActionTree } from 'vuex';
import { api } from '../../boot/axios';
import type { LoginSuccess } from '../../interfaces/auth/Acces.interfaces';

export const actions: ActionTree<LoginSuccess, unknown> = {
  async getProyects({ commit }) {
    try {
      const { data } = await api.post('SA/proyectos/get', {
        nombre: 'Luis',
        apellido: 'Hernandez',
        perfil: 'Administrador',
      });
      commit('SET_LIST_PROYECT', data.result);
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
      commit('SET_VIEW_PROYECT', data.result);
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
  async byProyectDelete({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/deleteProyectById', item);
      console.log('data: ', data);

      commit('data');
      return {
        ok: true,
        resultado: data.mensaje,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al eliminar el proyecto.',
      };
    }
  },
  async MandatoCreate({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/createproyect', item);
      commit('data');
      return {
        ok: true,
        resultado: data.mensaje,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al crear un proyecto.',
      };
    }
  },
  async updateProduct({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/saveproyect', item);
      commit('data');
      return {
        ok: true,
        resultado: data.mensaje,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al actualizar el Producto.',
      };
    }
  },
};
