import { ref } from 'vue';
import GridComponent from '../../../components/grid/GridComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';

export default {
  name: 'GridMandatos',
  components: {
    GridComponent,
    BreadCrumb,
  },
  setup() {
    const breadcrumbRoutes = ref([
      { label: 'Listar Mandatos', path: '/dashboard/listar-mandatos' },
    ]);

    return {
      breadcrumbRoutes,
    };
  },
};
