// src/store/modules/auth/actions.ts
import { ActionTree } from 'vuex';
import axios from 'axios';
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
      const { headers, data } = await api.post<AccesUserI>('/login/otp', {
        otp,
      });
      localStorage.clear();
      localStorage.setItem('token', headers.token);
      console.log('dataS: ', data);

      commit('SET_ACCES_DATA', data);
      return {
        ok: true,
        token: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al validar el código',
      };
    }
  },
  async createUser({ commit }, user) {
    try {
      const response = await api.post('/user/new', user);
      commit('data');
      return {
        ok: true,
        token: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al crear el registro',
      };
    }
  },
  async UpdateUser({ commit }, user) {
    try {
      const response = await api.post('user/edituserbyid', user);
      commit('data');
      return {
        ok: true,
        token: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al actualizar el registro',
      };
    }
  },
  async resetPassword({ commit }, pass) {
    try {
      const response = await api.post('/user/resetpass', { id: pass });
      commit(response.data);
      return {
        ok: true,
        token: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al crear el registro',
      };
    }
  },
  async getValidToken({ commit }, result) {
    try {
      const response = await api.post('/user/pingtokennewuser', {
        token: result,
      });
      commit('data');
      return {
        ok: true,
        token: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message:
          'Tóken expirado / Inválido favor de contactar a su Administrador',
      };
    }
  },
  async createPassword({ commit }, data) {
    try {
      const response = await api.post('/user/completenewuser', data);
      commit(response.data);
      return {
        ok: true,
        token: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al crear su contraseña',
      };
    }
  },
  async AllUser({ commit }) {
    try {
      const response = await api.get('/user/infousers');
      commit('data');
      return {
        ok: true,
        resultado: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener los usuarios',
      };
    }
  },
  async ByIdUser({ commit }, item) {
    try {
      const { data } = await api.post('/user/infobyid', { _id: item.id });
      console.log('response: ', data);
      if (item.opc === 1) {
        commit('SET_ACCES_PERMIS', data);
      } else {
        commit('SET_ACCES_PERMIS_TABLE', data);
      }

      return {
        ok: true,
        resultado: data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener los usuarios',
      };
    }
  },
  async fetchIp() {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error fetching IP:', error);
    }
  },
};
