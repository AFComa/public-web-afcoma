import { ref, onMounted } from 'vue';
import LoadingOverBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import { useAuth } from 'src/composables/userAuth';
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
    const loading = ref(false);
    const { getUserId, isAcces } = useAuth();

    const onGetUser = async () => {
      loading.value = true;
      await getUserId({
        id: isAcces.value.ID,
        opc: 1,
      });
      loading.value = false;
    };

    onMounted(async () => {
      await onGetUser();
    });

    return {
      onGetUser,
      breadcrumbRoutes,
      loading,
    };
  },
};
