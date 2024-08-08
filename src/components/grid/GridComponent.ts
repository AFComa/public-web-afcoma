import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import { useAuth } from 'src/composables/userAuth';
import { ListUsuario } from '../../utils/users/usersColums';
import type {
  ListUserI,
  ColumI,
} from '../../interfaces/components/Grid.interfaces';
import LoadingComponentBasic from '../../components/Loading/LoadingBasicComponent.vue';

export default {
  name: 'GridComponent',
  components: {
    LoadingComponentBasic,
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const showConfirmDialog = ref(false);
    const { resetPass, getUser, getUserId } = useAuth();
    const $q = useQuasar();

    const search = ref('');
    const columns = ref<ColumI[]>([]);
    const rows = ref<ListUserI[]>([]);

    const filteredRows = computed(() => {
      const searchLower = search.value.toLowerCase();
      return rows.value.filter((row) => {
        return Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        );
      });
    });

    function capitalizeFirstLetter(valores: string) {
      return valores.charAt(0).toUpperCase() + valores.slice(1).toLowerCase();
    }

    function capitalizeUserData(item: ListUserI) {
      console.log('items: ', item);

      return {
        ...item,
        user: capitalizeFirstLetter(item.user),
        apellidos: capitalizeFirstLetter(item.apellidos),
      };
    }

    const rouView = () => {
      localStorage.removeItem('actionuser');
      router.push('/dashboard/usuarios');
    };

    const loadColums = () => {
      columns.value = ListUsuario();
    };

    const viewRow = (row: ListUserI) => {
      localStorage.setItem('actionuser', 'view');
      router.push({ name: 'UsuariosId', params: { id: row._id } });
    };
    const editRow = async (row: ListUserI) => {
      localStorage.setItem('actionuser', 'edit');
      await getUserId({ id: row._id, opc: 2 });
      router.push({ name: 'UsuariosId', params: { id: row._id } });
    };
    const deleteRow = (row: ListUserI) => {
      console.log('Delete', row);
      showConfirmDialog.value = true;
    };
    const blockUser = async (row: ListUserI) => {
      const response = await resetPass(row._id);
      console.log(response);
    };
    const deleteRecord = async () => {
      showConfirmDialog.value = false;
      $q.notify({
        type: 'positive',
        message: 'El registro se elimino correctamente',
      });
    };

    const orderGrid = async () => {
      loading.value = true;
      const result = await getUser();
      if (result.ok) {
        rows.value = result.resultado.map((item: ListUserI) =>
          capitalizeUserData(item)
        );
      }
      loading.value = false;
    };

    onMounted(() => {
      loadColums();
      orderGrid();
    });

    return {
      columns,
      loading,
      rows,
      filteredRows,
      search,
      showConfirmDialog,
      loadColums,
      orderGrid,
      rouView,
      viewRow,
      editRow,
      deleteRow,
      blockUser,
      deleteRecord,
      capitalizeFirstLetter,
      capitalizeUserData,
    };
  },
};
