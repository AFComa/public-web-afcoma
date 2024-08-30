import { ref } from 'vue';
import { useRoute } from 'vue-router';
import GridComponent from '../../../components/grid/GridComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';

export default {
  name: 'GridProyects',
  components: {
    GridComponent,
    BreadCrumb,
  },
  setup() {
    const route = useRoute();

    const breadcrumbRoutes = ref(
      route.path === '/dashboard/listar-proyectos'
        ? [
            { label: 'Sys@Doc', path: '/dashboard/view-doc' },
            { label: 'Listar Proyectos', path: '/dashboard/listar-proyectos' },
          ]
        : [
            { label: 'Sys@Doc', path: '/dashboard/view-doc' },
            {
              label: 'Configuración Proyectos',
              path: '/dashboard/config',
            },
          ]
    );

    return {
      breadcrumbRoutes,
    };
  },
};
