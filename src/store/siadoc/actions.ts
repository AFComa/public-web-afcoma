// src/store/modules/auth/actions.ts
import { ActionTree } from 'vuex';
import { api } from '../../boot/axios';
import type { LoginSuccess } from '../../interfaces/auth/Acces.interfaces';

export const actions: ActionTree<LoginSuccess, unknown> = {
  async getProyects({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/get', item);
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
  async allProyectLayout({ commit }) {
    try {
      const { data } = await api.get('SA/proyectos/getproyectlayout');

      commit('data');
      return {
        ok: true,
        resultado: data.result,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener los usuarios.',
      };
    }
  },
  async DeleteProyect({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/deleteConfigProyectById', {
        id: item,
      });

      commit('data');
      return {
        ok: true,
        resultado: data.mensaje,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al eliminar el registro.',
      };
    }
  },
  async DowloadPr({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/getconfigbyid', {
        proyect: item,
      });

      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al descargar el registro.',
      };
    }
  },
  async getProyectsAll({ commit }) {
    try {
      const { data } = await api.get('SA/proyectos/getproyects');

      commit('data');
      return {
        ok: true,
        resultado: data.result,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener los usuarios.',
      };
    }
  },
  async DatosProyectobyId({ commit }, item) {
    try {
      const { data } = await api.post(
        'SA/proyectos/cargaDatosProyectobyId',
        item
      );

      commit('data');
      return {
        ok: data.error,
        resultado: data.mensaje,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al descargar el registro.',
      };
    }
  },
  async AssingProyectobyId({ commit }, item) {
    try {
      const { data } = await api.post(
        'SA/proyectos/assiguserproyectlayout',
        item
      );

      commit('data');
      return {
        ok: data.error,
        resultado: data.mensaje,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al descargar el registro.',
      };
    }
  },
  async getProyectsGeneralAll({ commit }) {
    try {
      const { data } = await api.get('SA/proyectos/getlayoutGeneral');

      commit('data');
      return {
        ok: true,
        resultado: data.result,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener los usuarios.',
      };
    }
  },
  async RegisterProyecto({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/getProyectById', item);

      commit('data');
      return {
        ok: data.error,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al descargar el registro.',
      };
    }
  },
  async ReportInc({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/getReportInc', item);

      commit('data');
      return {
        ok: data.error,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al descargar el registro.',
      };
    }
  },
  async ReportIncTotal({ commit }, item) {
    try {
      const { data } = await api.post('SA/proyectos/getReportTotal', item);

      commit('data');
      return {
        ok: data.error,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al descargar el registro.',
      };
    }
  },
  async ReportProyectID({ commit }, item) {
    try {
      const { data } = await api.post(
        'SA/proyectos/getInformationRowProyectById',
        item
      );

      commit('data');
      return {
        ok: data.error,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al descargar el registro.',
      };
    }
  },
  async CheckFiles({ commit }, item) {
    try {
      const { data } = await api.post('SA/onedrive/checkFiles', item);

      commit('data');
      return {
        ok: data.error,
        resultado: data.result,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al descargar el registro.',
      };
    }
  },
  async UpdateInformation({ commit }, item) {
    try {
      const { data } = await api.post(
        'SA/proyectos/updateValidationsProyect',
        item
      );

      commit('data');
      return {
        ok: data.error,
        resultado: data.mensaje,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al descargar el registro.',
      };
    }
  },
};
