import { ref } from 'vue';

import GridCarteraComponent from '../../../components/grid/CargaCartera/GridComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';

export default {
  name: 'GridProyects',
  components: {
    GridCarteraComponent,
    BreadCrumb,
  },
  setup() {
    const breadcrumbRoutes = ref([
      { label: 'Listar Cartera', path: '/dashboard/listar-cartera' },
      {
        label: 'Carga Cartera',
        path: '/dashboard/configuration-carga',
      },
    ]);

    return {
      breadcrumbRoutes,
    };
  },
};
