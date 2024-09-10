import { computed } from 'vue';
import { useStore } from 'vuex';
import type { UserI } from '../interfaces/auth/Acces.interfaces';
import {
  ColumCreateMandatosI,
  ColumCreateSisadocI,
  ColumCreateUserI,
  CreateGUI,
  EstatusI,
  OpcGridI,
} from 'src/interfaces/components/Grid.interfaces';

export const useAuth = () => {
  const store = useStore();

  return {
    isToken: computed(() => store.state.auth.data),
    isAcces: computed(() => store.state.auth.infoAcces),
    isUserPermission: computed(() => store.state.auth.permissionUser),
    isSysadocPermission: computed(() => store.state.auth.permissionSysadoc),
    isMandatosPermission: computed(() => store.state.auth.permissionMandatos),
    isTablePermission: computed(() => store.state.auth.TablePermission),
    isPermission: computed(() => store.state.auth.permission),
    isAssingUser: computed(() => store.state.auth.assingUser),

    // Mutations
    setPermissionUser: (
      item: ColumCreateUserI | ColumCreateSisadocI | ColumCreateMandatosI[]
    ) => store.commit('auth/SET_USERS_PERMIS', item),
    setPermissionSysad: (
      item: ColumCreateUserI | ColumCreateSisadocI | ColumCreateMandatosI[]
    ) => store.commit('auth/SET_SYSAD_PERMIS', item),
    setPermissionMandat: (
      item: ColumCreateUserI | ColumCreateSisadocI | ColumCreateMandatosI[]
    ) => store.commit('auth/SET_MANDAT_PERMIS', item),

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
    ResetPassComplete: (data: string) =>
      store.dispatch('auth/resetPasswordComplete', data),
    ValidToken: (data: string) => store.dispatch('auth/getValidToken', data),
    getUser: () => store.dispatch('auth/AllUser'),
    getUserId: (item: OpcGridI) => store.dispatch('auth/ByIdUser', item),
    UpdateStatus: (item: EstatusI) => store.dispatch('auth/updateStatus', item),
  };
};
