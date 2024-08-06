import { computed } from 'vue';
import { useStore } from 'vuex';
import type { UserI } from '../interfaces/auth/Acces.interfaces';
import {
  ColumCreateUserI,
  CreateGUI,
} from 'src/interfaces/components/Grid.interfaces';
// import { CreateGUI } from 'src/interfaces/components/Grid.interfaces';

export const useAuth = () => {
  const store = useStore();

  return {
    isToken: computed(() => store.state.auth.data),
    isUserPermission: computed(() => store.state.auth.permissionUser),
    isSysadocPermission: computed(() => store.state.auth.permissionSysadoc),
    isMandatosPermission: computed(() => store.state.auth.permissionMandatos),

    // Mutations
    setPermissionUser: (item: ColumCreateUserI[]) =>
      store.commit('auth/SET_USERS_PERMIS', item),
    setPermissionSysad: (item: ColumCreateUserI[]) =>
      store.commit('auth/SET_SYSAD_PERMIS', item),
    setPermissionMandat: (item: ColumCreateUserI[]) =>
      store.commit('auth/SET_MANDAT_PERMIS', item),

    // Getters
    isLogged: computed(() => store.getters['auth/isLogged']),

    // Actions
    getIp: () => store.dispatch('auth/fetchIp'),
    saveUser: (data: UserI) => store.dispatch('auth/loginUser', data),
    validCode: (valid: string) => store.dispatch('auth/accesLogin', valid),
    createUsers: (data: CreateGUI) => store.dispatch('auth/createUser', data),
    resetPass: (id: number | undefined) =>
      store.dispatch('auth/resetPassword', id),
    CreatePass: (data: string) => store.dispatch('auth/createPassword', data),
  };
};
