import { ref } from 'vue';
import GridComponent from '../../../components/grid/GridComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';

export default {
  name: 'GridProyects',
  components: {
    GridComponent,
    BreadCrumb,
  },
  setup() {
    const breadcrumbRoutes = ref([
      { label: 'Sys@Doc', path: '/dashboard/view-doc' },
      { label: 'Listar Proyectos', path: '/dashboard/listar-proyectos' },
    ]);

    return {
      breadcrumbRoutes,
    };
  },
};
