import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

import DialogComponent from '../../components/Dialog/DialogComponent.vue';
import DialogAssingComponent from '../../components/Dialog/DialogAssingComponent.vue';
import { useAuth } from 'src/composables/userAuth';
import { mandatosAuth } from 'src/composables/mandatosAuth';
import { sysadocAuth } from 'src/composables/sysadocAuth';
import {
  ListMandatos,
  ListUsuario,
  ListProyects,
} from '../../utils/users/usersColums';
import type {
  ListUserI,
  ColumI,
  DeleteProyectI,
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
    const { allMandatos, mandatoId, asignMandatos } = mandatosAuth();
    const { allProyects, DeleteProyects, getIdProyects } = sysadocAuth();
    const $q = useQuasar();
    const warningDialog = ref(false);
    const viewGrid = ref(false);
    const viewMandatoSysadoc = ref(false);
    const dialogVisible = ref(false);
    const MessageDialog = ref('');
    const estatus = ref();
    const uid = ref();
    const infoDelete = ref();
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

    const rouViewPage = async (item: string) => {
      if (item === '1') {
        if (route.path === '/dashboard/listar-mandatos') {
          router.push('/dashboard/validar-information');
        } else {
          router.push('/dashboard/proyectos');
          localStorage.removeItem('actionuser');
        }
      } else {
        await orderGrid();
        dialogVisible.value = true;
      }
    };

    const active = (rows: ListUserI) => {
      uid.value = rows._id;
      estatus.value = rows.estatus == 'Activo' ? 'Inactivo' : 'Activo';
      if (rows.estatus === 'Activo') {
        MessageDialog.value = `Esta seguro que desea Desactivar el usuario <strong> ${rows.user} ${rows.apellidos} </strong>`;
      } else {
        MessageDialog.value = `Esta seguro que desea Activar el usuario <strong> ${rows.user} ${rows.apellidos} </strong>`;
      }
      warningDialog.value = true;
    };

    const directOptionsValue = async () => {
      if (route.path === '/dashboard/listar-mandatos') {
        viewGrid.value = true;
        viewMandatoSysadoc.value = false;
        columns.value = ListMandatos();
        validuser.value = await isPermission.value.configUser
          .mandatosPermissions[0];
        await orderGridMandatos();
      } else if (route.path === '/dashboard/listar-proyectos') {
        viewGrid.value = true;
        viewMandatoSysadoc.value = true;
        columns.value = ListProyects();
        validuser.value = await isPermission.value.configUser
          .sysadocPermission[0];
        await orderProyects();
      } else {
        viewGrid.value = false;
        columns.value = ListUsuario();
        validuser.value = await isPermission.value.configUser
          .usersPermissions[0];
        await orderGrid();
      }
    };

    const orderProyects = async () => {
      loading.value = true;
      const proyectsAll = {
        apellido: isPermission.value.apellidos,
        nombre: isPermission.value.user,
        perfil: isPermission.value.configUser.sysadocPermission[0].opera
          ? 'Administrador'
          : '',
      };
      const resultado = await allProyects(proyectsAll);
      if (resultado.ok) {
        rows.value = resultado.token.result ? resultado.token.result : [];
      }
      loading.value = false;
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

    const viewRow = async (row: ListUserI & DeleteProyectI) => {
      if (viewGrid.value) {
        loading.value = true;
        (await viewMandatoSysadoc.value)
          ? await getIdProyects(row.id)
          : await mandatoId(row._id);

        localStorage.setItem('actionuser', 'view');
        router.push({
          name: viewMandatoSysadoc.value ? 'ProyectosEdit' : 'MandatosView',
          params: { id: viewMandatoSysadoc.value ? row.id : row._id },
        });
        loading.value = false;
      } else {
        localStorage.setItem('actionuser', 'view');
        await getUserId({ id: row._id, opc: 2 });
        router.push({ name: 'UsuariosId', params: { id: row._id } });
      }
    };
    const editRow = async (row: ListUserI & DeleteProyectI) => {
      if (viewGrid.value) {
        loading.value = true;
        (await viewMandatoSysadoc.value)
          ? await getIdProyects(row.id)
          : await mandatoId(row._id);

        localStorage.setItem('actionuser', 'edit');
        router.push({
          name: viewMandatoSysadoc.value ? 'ProyectosEdit' : 'MandatosView',
          params: { id: viewMandatoSysadoc.value ? row.id : row._id },
        });
        loading.value = false;
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
            'La liga para desbloquear el usuario se envio correctamente.',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: response.message,
        });
      }
    };

    const deletRow = async (row: DeleteProyectI) => {
      infoDelete.value = row;
      warningDialog.value = true;
      MessageDialog.value = `Al borrar el proyecto <strong> ${row.NombreProyecto} </strong> se limpiará todos los registros de esté en el sistema`;
    };

    const onConfirm = async () => {
      loading.value = true;
      warningDialog.value = false;

      if (route.path === '/dashboard/listar-usuarios') {
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
      } else {
        const response = await DeleteProyects({
          id: infoDelete.value.id,
          cartera: infoDelete.value.cartera,
          cesion: infoDelete.value.cesion,
          proyect: infoDelete.value.NombreProyecto,
        });
        if (response.ok) {
          await orderProyects();
          $q.notify({
            type: 'positive',
            message: response.resultado,
          });
        } else {
          $q.notify({
            type: 'negative',
            message: response.message,
          });
        }
      }
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
        if (route.path === '/dashboard/listar-usuarios') {
          rows.value = result.resultado.map((item: ListUserI) =>
            capitalizeUserData(item)
          );
        }
      }
      loading.value = false;
    };

    onMounted(async () => {
      await directOptionsValue();
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
      orderProyects,
      deletRow,
      validuser,
      viewMandatoSysadoc,
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
