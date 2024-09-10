import { ref } from 'vue';
import LoadingOverBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';

export default {
  name: 'DocSectionPage',
  components: {
    LoadingOverBasic,
    BreadCrumb,
  },
  setup() {
    const breadcrumbRoutes = ref([
      { label: 'Sys@Doc', path: '/dashboard/view-doc' },
    ]);

    return {
      breadcrumbRoutes,
    };
  },
};
