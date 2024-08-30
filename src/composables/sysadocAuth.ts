import { computed } from 'vue';
import { useStore } from 'vuex';
import type { proyectgetI } from '../interfaces/auth/Acces.interfaces';
import {
  AssingProyectI,
  CreateProyectI,
  DeleteProyectActionsI,
  CargaDatosProyectobyIdI,
  cargDatosExcelI,
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
    AssingProyects: (data: AssingProyectI) =>
      store.dispatch('sysadoc/asignProyects', data),
    DeleteProyects: (data: DeleteProyectActionsI) =>
      store.dispatch('sysadoc/byProyectDelete', data),
    getIdProyects: (data: string | undefined) =>
      store.dispatch('sysadoc/getProyectsId', data),
    allProyectLayout: () => store.dispatch('sysadoc/allProyectLayout'),
    DeletProyect: (id: string) => store.dispatch('sysadoc/DeleteProyect', id),
    DowloadPr: (id: string) => store.dispatch('sysadoc/DowloadPr', id),
    getProyectsAll: () => store.dispatch('sysadoc/getProyectsAll'),
    DatosProyectobyId: (data: CargaDatosProyectobyIdI) =>
      store.dispatch('sysadoc/DatosProyectobyId', data),
    AssingProyectobyId: (data: cargDatosExcelI) =>
      store.dispatch('sysadoc/AssingProyectobyId', data),
    getProyectsGeneralAll: () =>
      store.dispatch('sysadoc/getProyectsGeneralAll'),
  };
};
