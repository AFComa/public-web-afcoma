import { computed, onMounted, ref } from 'vue';
import * as XLSX from 'xlsx';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

import DialogComponent from '../../../components/Dialog/DialogComponent.vue';
import DialogAssingComponent from '../../../components/Dialog/DialogAssingComponent.vue';
import DialogFileComponent from '../../Dialog/DialogFileCompontent.vue';
import DialogConfigComponent from '../../Dialog/DialogConfLayoutComponent.vue';
import DialogManualComponent from '../../Dialog/DialogConfManualComponent.vue';
import { useAuth } from 'src/composables/userAuth';
import { mandatosAuth } from 'src/composables/mandatosAuth';
import { sysadocAuth } from 'src/composables/sysadocAuth';
import { carteraAuth } from 'src/composables/carteraAuth';
import { ListMandatos } from '../../../utils/users/usersColums';
import type {
  ListUserI,
  ColumI,
  DeleteProyectI,
  CargaDatosProyectobyIdI,
  cargDatosExcelI,
} from '../../../interfaces/components/Grid.interfaces';
import LoadingComponentBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import {
  MandatosAssingI,
  filterSelectI,
} from 'src/interfaces/auth/Acces.interfaces';

export default {
  name: 'GridComponent',
  components: {
    LoadingComponentBasic,
    DialogComponent,
    DialogAssingComponent,
    DialogFileComponent,
    DialogConfigComponent,
    DialogManualComponent,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const { resetPass, getUser, getUserId, isPermission, isAcces } = useAuth();
    const { allMandatos, mandatoId, asignMandatos } = mandatosAuth();
    const { getReportCartera, deleteCartera } = carteraAuth();
    const {
      allProyects,
      getIdProyects,
      AssingProyects,
      allProyectLayout,
      DowloadPr,
      DatosProyectobyId,
      AssingProyectobyId,
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
        router.push('/dashboard/configuration-cartera');
      } else {
        router.push('/dashboard/configuration-relation');
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
      viewGrid.value = true;
      viewMandatoSysadoc.value = false;
      columns.value = ListMandatos();
      validuser.value = await isPermission.value.configUser
        .mandatosPermissions[0];
      await orderGridMandatos();
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
      if (viewGrid.value) {
        loading.value = true;
        localStorage.setItem('actionuser', 'view');
        if (viewMandatoSysadoc.value) {
          router.push({
            name: 'RegisterProyect',
            params: {
              id: row.cartera,
              cesion: row.cesion,
              name: row.NombreProyecto,
            },
          });
        } else {
          const response = await mandatoId(row._id);
          localStorage.setItem('mandatoName', response.resultado.idmandato);
          router.push({
            name: 'MandatosView',
            params: { id: row._id },
          });
        }

        loading.value = false;
      } else {
        localStorage.setItem('actionuser', 'view');
        await getUserId({ id: row._id, opc: 2 });
        router.push({ name: 'UsuariosId', params: { id: row._id } });
      }
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
      MessageDialog.value = `Al borrar la configuración <strong> ${row.idmandato} </strong> se tendrá que configurar nuevamente para realizar cargas de información en el proyecto.`;
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
      const data = {
        user: {
          user_name: `${isAcces.value.username} ${isAcces.value.apellidos}`,
          id_user: isAcces.value.ID,
        },
        nombre_mandato: infoDelete.value.idmandato,
      };
      const response = await deleteCartera(data);
      if (response.ok) {
        $q.notify({
          type: 'positive',
          message: response.resultado.msg,
        });
      } else {
        $q.notify({
          type: 'negative',
          message: response.message,
        });
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
          message: response.resultado.mensaje,
        });
      } else {
        if (response.resultado.response_server !== 400) {
          const date = new Date().toLocaleDateString();
          const worksheet = XLSX.utils.json_to_sheet(
            response.resultado.reporte
          );
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            'Resultado de Carga'
          );
          XLSX.writeFile(
            workbook,
            `Resultado de Carga ${uid.value} al ${date}.xlsx`
          );
        }

        $q.notify({
          type: 'negative',
          message: response.resultado.mensaje,
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

    const dowloand = async (row: MandatosAssingI) => {
      loading.value = true;
      const response = await getReportCartera(row.idmandato);
      if (response.ok) {
        const configuracionesdata = XLSX.utils.json_to_sheet(
          response.resultado?.relacion
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          configuracionesdata,
          'configuraciones'
        );

        XLSX.writeFile(
          workbook,
          `Configuración del Layout ${row.idmandato}.xlsx`
        );

        $q.notify({
          type: 'positive',
          message: 'La descarga fue correctamente.',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: response.message,
        });
      }
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
      dowloand,
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
      viewGrid,
      dialogVisible,
      dialogVisibleDoc,
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
