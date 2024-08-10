import { ref, onMounted } from 'vue';
import LoadingOverBasic from '../../components/Loading/LoadingBasicComponent.vue';
import { useAuth } from 'src/composables/userAuth';

export default {
  name: 'SectionPage',
  components: {
    LoadingOverBasic,
  },
  setup() {
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
      loading,
    };
  },
};
