// import { computed } from 'vue';
import { useStore } from 'vuex';
import type {
  CatalogoCreate,
  RelationGeneralCatalogo,
} from '../interfaces/auth/Acces.interfaces';

export const carteraAuth = () => {
  const store = useStore();

  return {
    // State

    // Mutations

    // Getters

    // Actions
    createCatalogo: (data: CatalogoCreate) =>
      store.dispatch('cartera/createCatalogo', data),
    editCatalogo: (data: CatalogoCreate) =>
      store.dispatch('cartera/editCatalogo', data),
    deleteCatalogo: (data: CatalogoCreate) =>
      store.dispatch('cartera/deleteCatalogo', data),
    relationCatalog: (data: RelationGeneralCatalogo) =>
      store.dispatch('cartera/relationCatalog', data),
    getCatalogo: () => store.dispatch('cartera/getCatalogo'),
    getCatalogoAssing: () => store.dispatch('cartera/listMandatosAssing'),
    getReportCartera: (data: string) =>
      store.dispatch('cartera/reportRelation', data),
  };
};
