import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import DialogComponent from '../../components/Dialog/DialogComponent.vue';
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
    DialogComponent,
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const { resetPass, getUser, getUserId, UpdateStatus, isPermission } =
      useAuth();
    const $q = useQuasar();
    const warningDialog = ref(false);
    const MessageDialog = ref('');
    const estatus = ref();
    const uid = ref();
    const validuser = ref({
      id: '',
      module: '',
      create: false,
      edit: false,
      delete: false,
      view: false,
      download: false,
      opera: false,
    });

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

    const active = (rows: ListUserI) => {
      uid.value = rows._id;
      estatus.value = rows.estatus == 'Activo' ? 'Inactivo' : 'Activo';
      if (rows.estatus === 'Activo') {
        MessageDialog.value = `Esta seguro que desea Desactivar el usuario ${rows.user} ${rows.apellidos}`;
      } else {
        MessageDialog.value = `Esta seguro que desea Activar el usuario ${rows.user} ${rows.apellidos}`;
      }
      warningDialog.value = true;
    };

    const loadColums = () => {
      columns.value = ListUsuario();
    };

    const viewRow = async (row: ListUserI) => {
      localStorage.setItem('actionuser', 'view');
      await getUserId({ id: row._id, opc: 2 });
      router.push({ name: 'UsuariosId', params: { id: row._id } });
    };
    const editRow = async (row: ListUserI) => {
      localStorage.setItem('actionuser', 'edit');
      await getUserId({ id: row._id, opc: 2 });
      router.push({ name: 'UsuariosId', params: { id: row._id } });
    };
    const blockUser = async (row: ListUserI) => {
      const response = await resetPass(row._id);
      if (response.ok) {
        $q.notify({
          type: 'positive',
          message:
            'La liga para desbloquear el usuario se envio correctamente a su cuenta de correo.',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: response.message,
        });
      }
    };

    const onConfirm = async () => {
      warningDialog.value = false;
      loading.value = true;

      const response = await UpdateStatus({
        _id: uid.value,
        estatus: estatus.value,
      });
      if (response.ok) {
        $q.notify({
          type: 'positive',
          message: 'El estatus del usuario se actualizo correctamente.',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: response.message,
        });
      }
      orderGrid();
      loading.value = false;
    };

    function onCancel() {
      warningDialog.value = false;
    }

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

    onMounted(async () => {
      validuser.value = isPermission.value.configUser.usersPermissions[0];
      await loadColums();
      await orderGrid();
    });

    return {
      columns,
      validuser,
      loading,
      rows,
      filteredRows,
      search,
      warningDialog,
      MessageDialog,
      onConfirm,
      onCancel,
      active,
      loadColums,
      orderGrid,
      rouView,
      viewRow,
      editRow,
      blockUser,
      capitalizeFirstLetter,
      capitalizeUserData,
    };
  },
};
