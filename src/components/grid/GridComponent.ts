import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

import DialogComponent from '../../components/Dialog/DialogComponent.vue';
import DialogAssingComponent from '../../components/Dialog/DialogAssingComponent.vue';
import { useAuth } from 'src/composables/userAuth';
import { mandatosAuth } from 'src/composables/mandatosAuth';
import { ListMandatos, ListUsuario } from '../../utils/users/usersColums';
import type {
  ListUserI,
  ColumI,
} from '../../interfaces/components/Grid.interfaces';
import LoadingComponentBasic from '../../components/Loading/LoadingBasicComponent.vue';
import { filterSelectI } from 'src/interfaces/auth/Acces.interfaces';

export default {
  name: 'GridComponent',
  components: {
    LoadingComponentBasic,
    DialogComponent,
    DialogAssingComponent,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const { resetPass, getUser, getUserId, UpdateStatus, isPermission } =
      useAuth();
    const { allMandatos, mandatoId } = mandatosAuth();
    const { asignMandatos } = mandatosAuth();
    const $q = useQuasar();
    const warningDialog = ref(false);
    const viewGrid = ref(false);
    const dialogVisible = ref(false);
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

    const rouViewPage = (item: string) => {
      if (item === '1') {
        router.push('/dashboard/validar-information');
      } else {
        dialogVisible.value = true;
      }
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

    const directOptionsValue = async () => {
      if (route.path === '/dashboard/listar-mandatos') {
        viewGrid.value = true;
        columns.value = ListMandatos();
        await orderGridMandatos();
      } else {
        viewGrid.value = false;
        columns.value = ListUsuario();
        await orderGrid();
      }
    };

    const orderGridMandatos = async () => {
      loading.value = true;
      const mandatAll = {
        is_operator: isPermission.value.configUser.mandatosPermissions[0].opera,
        userid: isPermission.value._id,
      };
      const resultado = await allMandatos(mandatAll);

      if (resultado.ok) {
        rows.value = resultado.resultado ? resultado.resultado : [];
      }
      loading.value = false;
    };

    const viewRow = async (row: ListUserI) => {
      if (viewGrid.value) {
        await mandatoId(row._id);
        localStorage.setItem('actionuser', 'view');
        router.push({ name: 'MandatosView', params: { id: row._id } });
      } else {
        localStorage.setItem('actionuser', 'view');
        await getUserId({ id: row._id, opc: 2 });
        router.push({ name: 'UsuariosId', params: { id: row._id } });
      }
    };
    const editRow = async (row: ListUserI) => {
      if (viewGrid.value) {
        await mandatoId(row._id);
        localStorage.setItem('actionuser', 'edit');
        router.push({ name: 'MandatosView', params: { id: row._id } });
      } else {
        localStorage.setItem('actionuser', 'edit');
        await getUserId({ id: row._id, opc: 2 });
        router.push({ name: 'UsuariosId', params: { id: row._id } });
      }
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
      loading.value = true;
      warningDialog.value = false;
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
      dialogVisible.value = false;
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
      await directOptionsValue();
      validuser.value = isPermission.value.configUser.usersPermissions[0];
    });

    const handleSelect = async (
      selectedValue: filterSelectI,
      mandatosValue: filterSelectI
    ) => {
      loading.value = true;
      const data = {
        idmandato: mandatosValue.value,
        userid: selectedValue.value,
      };

      const response = await asignMandatos(data);
      if (response.ok) {
        $q.notify({
          type: 'positive',
          message: 'La asignación del mandato al usuario fue correctamente.',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: response.message,
        });
      }
      loading.value = false;
      await orderGridMandatos();
    };

    return {
      columns,
      directOptionsValue,
      validuser,
      loading,
      rows,
      filteredRows,
      search,
      warningDialog,
      MessageDialog,
      handleSelect,
      viewGrid,
      dialogVisible,
      rouViewPage,
      onConfirm,
      onCancel,
      active,
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
