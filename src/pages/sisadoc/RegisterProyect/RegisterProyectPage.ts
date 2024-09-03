import { ref } from 'vue';

import GridRegisterComponent from '../../../components/grid/RegisterProyect/GridComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';

export default {
  name: 'GridProyects',
  components: {
    GridRegisterComponent,
    BreadCrumb,
  },
  setup() {
    const breadcrumbRoutes = ref([
      { label: 'Sys@Doc', path: '/dashboard/view-doc' },
      { label: 'Listar Proyectos', path: '/dashboard/listar-proyectos' },
      {
        label: 'Registrar Proyectos',
      },
    ]);

    return {
      breadcrumbRoutes,
    };
  },
};
