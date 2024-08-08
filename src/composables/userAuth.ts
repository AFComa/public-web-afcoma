import { computed } from 'vue';
import { useStore } from 'vuex';
import type { UserI } from '../interfaces/auth/Acces.interfaces';
import {
  ColumCreateUserI,
  CreateGUI,
  OpcGridI,
} from 'src/interfaces/components/Grid.interfaces';
// import { CreateGUI } from 'src/interfaces/components/Grid.interfaces';

export const useAuth = () => {
  const store = useStore();

  return {
    isToken: computed(() => store.state.auth.data),
    isAcces: computed(() => store.state.auth.infoAcces),
    isUserPermission: computed(() => store.state.auth.permissionUser),
    isSysadocPermission: computed(() => store.state.auth.permissionSysadoc),
    isMandatosPermission: computed(() => store.state.auth.permissionMandatos),
    isTablePermission: computed(() => store.state.auth.TablePermission),

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
    updateUsers: (data: CreateGUI) => store.dispatch('auth/UpdateUser', data),
    resetPass: (id: string | undefined) =>
      store.dispatch('auth/resetPassword', id),
    CreatePass: (data: string) => store.dispatch('auth/createPassword', data),
    ValidToken: (data: string) => store.dispatch('auth/getValidToken', data),
    getUser: () => store.dispatch('auth/AllUser'),
    getUserId: (item: OpcGridI) => store.dispatch('auth/ByIdUser', item),
  };
};
