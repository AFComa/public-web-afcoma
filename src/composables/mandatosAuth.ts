import { computed } from 'vue';
import { useStore } from 'vuex';
import type {
  UserI,
  GetAllMandatoI,
  opcionAssingI,
} from '../interfaces/auth/Acces.interfaces';

export const mandatosAuth = () => {
  const store = useStore();

  return {
    isAssingMandatos: computed(() => store.state.mandatos.assingMandatos),
    isViewMandatos: computed(() => store.state.mandatos.viewMandatos),

    // Mutations

    // Getters

    // Actions
    saveMandatos: (data: UserI) =>
      store.dispatch('mandatos/createMandato', data),
    allMandatos: (data: GetAllMandatoI) =>
      store.dispatch('mandatos/allMandato', data),
    asignMandatos: (data: opcionAssingI) =>
      store.dispatch('mandatos/asignMandato', data),
    mandatoId: (data: string | undefined) =>
      store.dispatch('mandatos/getMandatoId', data),
    updateMandato: (data: GetAllMandatoI) =>
      store.dispatch('mandatos/byMandatoUpdate', data),
  };
};
