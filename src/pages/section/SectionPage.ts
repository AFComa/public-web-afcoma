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
    const user = ref({
      id: '',
      module: '',
      create: false,
      edit: false,
      delete: false,
      view: false,
      download: false,
      opera: false,
      block: false,
    });
    const mandatos = ref({
      id: '',
      module: '',
      create: false,
      edit: false,
      delete: false,
      view: false,
      download: false,
      opera: false,
      block: false,
    });
    const { getUserId, isAcces, isPermission } = useAuth();

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
      user.value = await isPermission.value.configUser.usersPermissions[0];
      mandatos.value = await isPermission.value.configUser
        .mandatosPermissions[0];
    });

    return {
      onGetUser,
      loading,
      user,
      mandatos,
    };
  },
};
