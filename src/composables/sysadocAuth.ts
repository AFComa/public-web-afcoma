import { computed } from 'vue';
import { useStore } from 'vuex';
import type { proyectgetI } from '../interfaces/auth/Acces.interfaces';

export const sysadocAuth = () => {
  const store = useStore();

  return {
    isAssingMandatos: computed(() => store.state.sysadoc.listProyects),

    // Mutations

    // Getters

    // Actions
    allProyects: (data: proyectgetI) =>
      store.dispatch('sysadoc/getProyects', data),
  };
};
