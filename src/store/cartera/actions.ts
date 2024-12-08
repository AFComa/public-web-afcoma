// src/store/modules/auth/actions.ts
import { ActionTree } from 'vuex';
import { api } from '../../boot/axios';
import { isAxiosError } from 'axios';
import type {
  LoginSuccess,
  LoginError,
} from '../../interfaces/auth/Acces.interfaces';

export const actions: ActionTree<LoginSuccess, unknown> = {
  async createCatalogo({ commit }, info) {
    try {
      const { data } = await api.post<LoginSuccess | LoginError>(
        'catalogogeneral/add',
        info
      );

      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al crear el registro.',
      };
    }
  },
  async editCatalogo({ commit }, item) {
    try {
      const { data } = await api.post('catalogogeneral/edit', item);

      commit('SET_ASSING_MANDATOS', data);
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al actualizar el registro.',
      };
    }
  },
  async deleteCatalogo({ commit }, item) {
    try {
      const { data } = await api.post('catalogogeneral/delete', item);
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al eliminar un registro.',
      };
    }
  },
  async getCatalogo({ commit }) {
    try {
      const { data } = await api.get('catalogogeneral/get');
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener la información.',
      };
    }
  },
  // END CATALOGO GENERAL....

  async uploadDirectaConfig({ commit }, item) {
    try {
      const { data } = await api.post('cargadirecta/new', item);
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al cargar la información.',
      };
    }
  },
  async relationCatalog({ commit }, item) {
    try {
      const { data } = await api.post('relacion-cg-cc/new', item);
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return {
          ok: false,
          message: error.response.data.detail,
        };
      }

      throw new Error('No se pudo realizar la petición');
    }
  },
  async listMandatosAssing({ commit }) {
    try {
      const { data } = await api.get('relacion-cg-cc/get');
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al listar la información.',
      };
    }
  },

  async reportRelation({ commit }, items) {
    try {
      const { data } = await api.post('relacion-cg-cc/report', {
        nombre_mandato: items,
      });
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return {
          ok: false,
          message: error.response.data.detail,
        };
      }

      throw new Error('No se pudo realizar la petición');
    }
  },

  async deleteRelation({ commit }, items) {
    try {
      const { data } = await api.post('relacion-cg-cc/delete', items);
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return {
          ok: false,
          message: error.response.data.detail,
        };
      }

      throw new Error('No se pudo realizar la petición');
    }
  },

  async vistageneral({ commit }, items) {
    try {
      const { data } = await api.post('vistageneral/getbyid', {
        idmandato: items,
      });
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return {
          ok: false,
          message: error.response.data.detail,
        };
      }

      throw new Error('No se pudo realizar la petición');
    }
  },

  async setLinkPowerBi({ commit }, items) {
    try {
      const { data } = await api.post('vistageneral/setlinkpbi', items);
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return {
          ok: false,
          message: error.response.data.detail,
        };
      }

      throw new Error('No se pudo realizar la petición');
    }
  },

  async getLinkPowerBi({ commit }, items) {
    try {
      const { data } = await api.post('vistageneral/getlinkpbi', {
        idmandato: items,
      });
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'El link no fue obtenido correctamente',
      };
    }
  },

  async setReport({ commit }, items) {
    try {
      const { data } = await api.post(
        'SA/onedrive/vistageneral/setreports',
        items
      );
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return {
          ok: false,
          message: error.response.data.detail,
        };
      }

      throw new Error('No se pudo realizar la petición');
    }
  },

  async getReport({ commit }, items) {
    try {
      const { data } = await api.post('SA/onedrive/vistageneral/getreports', {
        identificador: items,
      });
      commit('data');
      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return {
          ok: false,
          message: error.response.data.detail,
        };
      }

      throw new Error('No se pudo realizar la petición');
    }
  },
};
