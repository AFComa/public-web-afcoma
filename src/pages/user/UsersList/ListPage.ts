import { ref } from 'vue';
import GridComponent from '../../../components/grid/GridComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';

export default {
  name: 'GridUser',
  components: {
    GridComponent,
    BreadCrumb,
  },
  setup() {
    const breadcrumbRoutes = ref([
      { label: 'Listar Usuario', path: '/dashboard/listar-usuarios' },
    ]);

    return {
      breadcrumbRoutes,
    };
  },
};
