import { computed, onMounted, ref } from 'vue';
import * as XLSX from 'xlsx';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

import { useAuth } from 'src/composables/userAuth';
import { mandatosAuth } from 'src/composables/mandatosAuth';
import { sysadocAuth } from 'src/composables/sysadocAuth';

import type {
  ListUserI,
  ColumI,
  DeleteProyectI,
  CargaDatosProyectobyIdI,
  cargDatosExcelI,
} from '../../../interfaces/components/Grid.interfaces';
import { ListRegisterProyects } from '../../../utils/users/usersColums';
import LoadingComponentBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import { filterSelectI } from 'src/interfaces/auth/Acces.interfaces';

export default {
  name: 'GridComponent',
  components: {
    LoadingComponentBasic,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const { resetPass, getUser, getUserId, UpdateStatus, isPermission } =
      useAuth();
    const { allMandatos, mandatoId, asignMandatos } = mandatosAuth();
    const {
      allProyects,
      DeleteProyects,
      getIdProyects,
      AssingProyects,
      allProyectLayout,
      DeletProyect,
      DowloadPr,
      DatosProyectobyId,
      AssingProyectobyId,
      RegisterProyecto,
      ReportInc,
      ReportIncTotal,
    } = sysadocAuth();
    const $q = useQuasar();
    const warningDialog = ref(false);
    const viewGrid = ref(false);
    const viewConfig = ref(false);
    const viewMandatoSysadoc = ref(false);
    const dialogVisible = ref(false);
    const dialogVisibleDoc = ref(false);
    const dialogVisibleConfig = ref(false);
    const dialogVisibleConfigM = ref(false);
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

    const rouViewPage = async (item: string) => {
      if (item === '1') {
        if (route.path === '/dashboard/listar-mandatos') {
          router.push('/dashboard/validar-information');
        } else if (route.path === '/dashboard/config') {
          dialogVisibleConfigM.value = true;
        } else {
          router.push('/dashboard/proyectos');
          localStorage.removeItem('actionuser');
        }
      } else {
        if (route.path === '/dashboard/config') {
          dialogVisibleConfig.value = true;
        } else {
          await orderGrid();
          dialogVisible.value = true;
        }
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
      const data = {
        id: route.params.id,
        cartera: route.params.name,
        cesion: route.params.cesion,
      };

      const result = await RegisterProyecto(data);
      if (!result.ok) {
        columns.value = ListRegisterProyects();
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
      router.push({
        name: 'ValidProyect',
        params: {
          id: row.id,
          uid: row._id,
          cartera: row.cartera,
          cesion: row.cesion,
        },
      });

      // if (viewGrid.value) {
      //   loading.value = true;
      //   (await viewMandatoSysadoc.value)
      //     ? await getIdProyects(row.id)
      //     : await mandatoId(row._id);

      //   localStorage.setItem('actionuser', 'view');
      //   router.push({
      //     name: viewMandatoSysadoc.value ? 'ProyectosEdit' : 'MandatosView',
      //     params: { id: viewMandatoSysadoc.value ? row.id : row._id },
      //   });
      //   loading.value = false;
      // } else {
      //   localStorage.setItem('actionuser', 'view');
      //   await getUserId({ id: row._id, opc: 2 });
      //   router.push({ name: 'UsuariosId', params: { id: row._id } });
      // }
    };

    const uploadFiles = async (row: ListUserI & DeleteProyectI) => {
      uid.value = row.id;
      dialogVisibleDoc.value = true;
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
      } else if (route.path === '/dashboard/config') {
        const response = await DeletProyect(infoDelete.value.id);
        if (response.ok) {
          await orderConfigProyects();
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
      dialogVisibleDoc.value = false;
      dialogVisibleConfig.value = false;
      dialogVisibleConfigM.value = false;
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

    const handleValue = async (value: CargaDatosProyectobyIdI) => {
      loading.value = true;
      const data = {
        cartera: value.cartera,
        cesion: value.cesion,
        data: value.data,
        id: uid.value,
      };
      const response = await DatosProyectobyId(data);
      if (!response.ok) {
        $q.notify({
          type: 'positive',
          message: response.resultado,
        });
      } else {
        $q.notify({
          type: 'negative',
          message: response.resultado,
        });
      }
      loading.value = false;
    };
    const handleValueExcel = async (value: cargDatosExcelI) => {
      loading.value = true;
      const response = await AssingProyectobyId(value);

      if (!response.ok) {
        $q.notify({
          type: 'positive',
          message: response.resultado,
        });
      } else {
        $q.notify({
          type: 'negative',
          message: response.resultado,
        });
      }
      await orderConfigProyects();
      loading.value = false;
    };

    const handleSelect = async (
      selectedValue: filterSelectI,
      mandatosValue: filterSelectI
    ) => {
      loading.value = true;
      if (route.path === '/dashboard/listar-proyectos') {
        const data = {
          asignado_a: selectedValue.label,
          _id: mandatosValue.value,
        };
        const response = await AssingProyects(data);
        if (response.ok) {
          $q.notify({
            type: 'positive',
            message: 'La asignación al usuario fue correctamente.',
          });
        } else {
          $q.notify({
            type: 'negative',
            message: response.message,
          });
        }
        await orderProyects();
      } else {
        const data = {
          idmandato: mandatosValue.value,
          userid: selectedValue.value,
        };

        const response = await asignMandatos(data);
        if (response.ok) {
          $q.notify({
            type: 'positive',
            message: 'La asignación al usuario fue correctamente.',
          });
        } else {
          $q.notify({
            type: 'negative',
            message: response.message,
          });
        }
        await orderGridMandatos();
      }

      loading.value = false;
    };

    return {
      columns,
      directOptionsValue,
      orderProyects,
      deletRow,
      dialogVisibleConfig,
      orderConfigProyects,
      ReportIncTotalDowload,
      uploadFiles,
      dowloadPro,
      validuser,
      viewMandatoSysadoc,
      dialogVisibleConfigM,
      loading,
      viewConfig,
      rows,
      filteredRows,
      search,
      warningDialog,
      MessageDialog,
      handleSelect,
      nameProyect,
      viewGrid,
      dialogVisible,
      dialogVisibleDoc,
      ReportIncDowload,
      rouViewPage,
      onConfirm,
      onCancel,
      active,
      handleValueExcel,
      orderGrid,
      rouView,
      viewRow,
      editRow,
      blockUser,
      capitalizeFirstLetter,
      capitalizeUserData,
      handleValue,
    };
  },
};
