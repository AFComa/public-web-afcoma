import { computed, onMounted, ref } from 'vue';
import * as XLSX from 'xlsx';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

import { useAuth } from 'src/composables/userAuth';
import { sysadocAuth } from 'src/composables/sysadocAuth';

import type {
  ListUserI,
  ColumI,
  DeleteProyectI,
} from '../../../interfaces/components/Grid.interfaces';
import LoadingComponentBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import DialogComponent from '../../../components/Dialog/DialogComponent.vue';

export default {
  name: 'GridComponent',
  components: {
    LoadingComponentBasic,
    DialogComponent,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const { resetPass, getUser, isPermission } = useAuth();
    const {
      allProyects,
      allProyectLayout,
      DowloadPr,
      RegisterProyecto,
      ReportInc,
      ReportIncTotal,
      enableFinalizadoEstatus,
    } = sysadocAuth();
    const $q = useQuasar();
    const warningDialog = ref(false);
    const EditEstatus = ref();
    const viewGrid = ref(false);
    const viewConfig = ref(false);
    const viewMandatoSysadoc = ref(false);
    const MessageDialog = ref('');
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
    const d = new Date();
    const myDate = d.toUTCString();

    const search = ref('');
    const columns = ref<ColumI[]>([]);
    const rows = ref<ListUserI[]>([]);
    const nameProyect = ref(route.params.name);

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

    const ReportIncDowload = async () => {
      loading.value = true;
      const data = {
        cartera: route.params.id,
        cesion: route.params.cesion,
        proyect: route.params.name,
      };
      const result = await ReportInc(data);

      if (!result.ok) {
        const link = document.createElement('a');
        const file = new Blob([result.resultado.result], {
          type: 'text/plain',
        });
        link.href = URL.createObjectURL(file);
        link.download = `reporte_${route.params.name}_${myDate}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
      }
      loading.value = false;
    };

    const ReportIncTotalDowload = async () => {
      loading.value = true;
      const data = {
        cartera: route.params.id,
        cesion: route.params.cesion,
        proyect: route.params.name,
      };
      const result = await ReportIncTotal(data);

      if (!result.ok) {
        const link = document.createElement('a');
        const file = new Blob([result.resultado.result], {
          type: 'text/plain',
        });
        link.href = URL.createObjectURL(file);
        link.download = `reporte_Total_Proyecto_${route.params.name}_${myDate}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
      }
      loading.value = false;
    };

    const active = (rows: ListUserI) => {
      MessageDialog.value = `Esta seguro que desea Activar el usuario <strong> ${rows.user} ${rows.apellidos} </strong>`;

      warningDialog.value = true;
    };

    const directOptionsValue = async () => {
      const data = {
        id: route.params.name,
        cartera: route.params.id,
        cesion: route.params.cesion,
      };

      const result = await RegisterProyecto(data);
      if (!result.ok) {
        columns.value = result.resultado.result.Columns;
        rows.value = result.resultado.result.Rows;
      }
    };
    const orderConfigProyects = async () => {
      loading.value = true;
      const resultado = await allProyectLayout();

      if (resultado.ok) {
        rows.value = resultado.resultado ? resultado.resultado : [];
      }
      loading.value = false;
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

    const viewRow = async (row: ListUserI & DeleteProyectI) => {
      router.push({
        name: 'ValidProyect',
        params: {
          id: row.id,
          uid: row._id,
          cartera: row.cartera,
          cesion: row.cesion,
          name: route.params.name,
        },
      });
    };

    const editRow = async (row: ListUserI & DeleteProyectI) => {
      MessageDialog.value =
        'Esta seguro que desea cambiar el estatus del proyecto.';

      EditEstatus.value = {
        proyect: route.params.name,
        _id: row._id,
      };
      warningDialog.value = true;
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
      MessageDialog.value = viewConfig.value
        ? `Al borrar la configuración <strong> ${row.id} </strong> se tendrá que configurar nuevamente para realizar cargas de información nuevamente en el proyecto.`
        : `Al borrar el proyecto <strong> ${row.NombreProyecto} </strong> se limpiará todos los registros de esté en el sistema`;
    };

    const dowloadPro = async (row: DeleteProyectI) => {
      loading.value = true;
      const response = await DowloadPr(row.id);
      if (response.ok) {
        const configuracionesdata = XLSX.utils.json_to_sheet(
          response.resultado?.configuraciones
        );
        const operacionesdata = XLSX.utils.json_to_sheet(
          response.resultado?.operaciones
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          configuracionesdata,
          'configuraciones'
        );
        XLSX.utils.book_append_sheet(workbook, operacionesdata, 'operaciones');

        XLSX.writeFile(workbook, `Configuración del proyecto ${row.id}.xlsx`);
        $q.notify({
          type: 'positive',
          message: response.resultado.mensaje,
        });
      } else {
        $q.notify({
          type: 'negative',
          message: response.message,
        });
      }
      loading.value = false;
    };

    const onConfirm = async () => {
      loading.value = true;
      warningDialog.value = false;
      const result = await enableFinalizadoEstatus(EditEstatus.value);
      if (!result.ok) {
        $q.notify({
          type: 'positive',
          message: result.resultado,
        });
      } else {
        $q.notify({
          type: 'negative',
          message: result.resultado,
        });
      }
      await directOptionsValue();
      loading.value = false;
    };

    function onCancel() {
      warningDialog.value = false;
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

    return {
      columns,
      directOptionsValue,
      orderProyects,
      deletRow,

      orderConfigProyects,
      ReportIncTotalDowload,
      dowloadPro,
      validuser,
      viewMandatoSysadoc,

      loading,
      viewConfig,
      rows,
      filteredRows,
      search,
      warningDialog,
      MessageDialog,
      nameProyect,
      viewGrid,
      EditEstatus,
      ReportIncDowload,
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