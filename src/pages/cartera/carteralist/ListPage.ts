import { ref } from 'vue';
import GridComponent from '../../../components/grid/Cartera/GridComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';

export default {
  name: 'GridCartera',
  components: {
    GridComponent,
    BreadCrumb,
  },
  setup() {
    const breadcrumbRoutes = ref([
      { label: 'Listar Cartera', path: '/dashboard/listar-cartera' },
    ]);

    return {
      breadcrumbRoutes,
    };
  },
};
