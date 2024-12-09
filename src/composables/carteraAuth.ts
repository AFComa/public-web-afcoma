// import { computed } from 'vue';
import { useStore } from 'vuex';
import type {
  CargaDirecta,
  CatalogoCreate,
  RelationGeneralCatalogo,
  linkPower,
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
    deleteCartera: (data: RelationGeneralCatalogo) =>
      store.dispatch('cartera/deleteRelation', data),
    vistageneral: (data: string | null) =>
      store.dispatch('cartera/vistageneral', data),
    setLinkPowerBi: (data: linkPower) =>
      store.dispatch('cartera/setLinkPowerBi', data),
    getLinkPowerBi: (data: string | null) =>
      store.dispatch('cartera/getLinkPowerBi', data),
    getReport: (data: string) => store.dispatch('cartera/getReport', data),
    uploadDirectaConfig: (data: CargaDirecta) =>
      store.dispatch('cartera/uploadDirectaConfig', data),
  };
};
