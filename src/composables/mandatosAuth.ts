import { computed } from 'vue';
import { useStore } from 'vuex';
import type { UserI } from '../interfaces/auth/Acces.interfaces';
import { ColumCreateUserI } from 'src/interfaces/components/Grid.interfaces';

export const mandatosAuth = () => {
  const store = useStore();

  return {
    isToken: computed(() => store.state.auth.data),

    // Mutations
    setPermissionUser: (item: ColumCreateUserI[]) =>
      store.commit('auth/SET_USERS_PERMIS', item),

    // Getters

    // Actions
    saveMandatos: (data: UserI) =>
      store.dispatch('mandatos/createMandato', data),
    allMandatos: (data: UserI) => store.dispatch('mandatos/allMandato', data),
    asignMandatos: (data: UserI) =>
      store.dispatch('mandatos/asignMandato', data),
  };
};
