import { computed } from 'vue';
import { useStore } from 'vuex';
import type { proyectgetI } from '../interfaces/auth/Acces.interfaces';
import {
  CreateProyectI,
  DeleteProyectActionsI,
} from 'src/interfaces/components/Grid.interfaces';

export const sysadocAuth = () => {
  const store = useStore();

  return {
    isViewProyects: computed(() => store.state.sysadoc.viewProyects),
    isListProyects: computed(() => store.state.sysadoc.listProyects),

    // Mutations

    // Getters

    // Actions
    allProyects: (data: proyectgetI) =>
      store.dispatch('sysadoc/getProyects', data),
    CreateProyects: (data: CreateProyectI) =>
      store.dispatch('sysadoc/MandatoCreate', data),
    UpdateProyects: (data: CreateProyectI) =>
      store.dispatch('sysadoc/updateProduct', data),
    DeleteProyects: (data: DeleteProyectActionsI) =>
      store.dispatch('sysadoc/byProyectDelete', data),
    getIdProyects: (data: string | undefined) =>
      store.dispatch('sysadoc/getProyectsId', data),
  };
};
