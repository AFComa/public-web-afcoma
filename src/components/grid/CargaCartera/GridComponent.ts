import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { sysadocAuth } from 'src/composables/sysadocAuth';
import { useAuth } from 'src/composables/userAuth';
import { carteraAuth } from 'src/composables/carteraAuth';
import type {
  ListUserI,
  ColumI,
  DeleteProyectI,
} from '../../../interfaces/components/Grid.interfaces';
import LoadingComponentBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import DialogComponent from '../../../components/Dialog/DialogComponent.vue';
import DialogCargaComponent from '../../Dialog/DialogCargaComponent.vue';
import { linkPower } from 'src/interfaces/auth/Acces.interfaces';

export default {
  name: 'GridComponent',
  components: {
    LoadingComponentBasic,
    DialogComponent,
    DialogCargaComponent,
  },
  setup() {
    const { isPermission, isAcces } = useAuth();
    const { vistageneral, setLinkPowerBi, getLinkPowerBi } = carteraAuth();
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const { ReportInc } = sysadocAuth();
    const $q = useQuasar();
    const warningDialog = ref(false);
    const titleActions = ref('');
    const dialogVisibleDoc = ref(false);
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
      block: false,
    });
    const d = new Date();
    const myDate = d.toUTCString();

    const search = ref('');
    const columns = ref<ColumI[]>([]);
    const rows = ref<[]>([]);
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

    const rouViewPage = async (item: string) => {
      if (item === '1') {
        titleActions.value = 'Cargar Url Power Bi';
        dialogVisibleDoc.value = true;
      } else {
        titleActions.value = 'Cargar Archivo';
        dialogVisibleDoc.value = true;
      }
    };

    const handleValue = async (value: string) => {
      const data = {
        user: {
          user_name: `${isAcces.value.username} ${isAcces.value.apellidos}`,
          id_user: isAcces.value.ID,
        },
        idmandato: localStorage.getItem('idmandato'),
        link: value,
      };
      if (titleActions.value === 'Cargar Archivo') {
        saveUpload(value);
      } else {
        saveLink(data);
      }
    };

    const saveLink = async (data: linkPower) => {
      loading.value = true;
      const result = await setLinkPowerBi(data);
      if (result.ok) {
        $q.notify({
          type: 'positive',
          message: result.resultado.msg,
        });
      } else {
        $q.notify({
          type: 'negative',
          message: result.message,
        });
      }
      loading.value = false;
    };

    const saveUpload = async (i: string) => {
      loading.value = true;
      const formData = new FormData();
      formData.append('file', i);
      const token = localStorage.getItem('token');
      try {
        const result = await axios.post(
          'https://apolo.afcoma.com.mx/v1/SA/onedrive/vistageneral/setreports',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
              'x-api-key': 'cls[ty-5JDrkzE1HFN9v',
              identificador: localStorage.getItem('idmandato'),
            },
          }
        );
        if (result.data.error) {
          $q.notify({
            type: 'negative',
            message: result.data.mensaje,
          });
        }
      } catch (error) {
        console.error(error);
      }
      loading.value = false;
    };

    const ReportIncTotalDowload = async () => {
      loading.value = true;
      const configuracionesdata = XLSX.utils.json_to_sheet(rows.value);

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        configuracionesdata,
        'configuración carga cartera'
      );

      XLSX.writeFile(
        workbook,
        `Configuración carga cartera ${localStorage.getItem('idmandato')}.xlsx`
      );

      loading.value = false;
    };

    const active = (rows: ListUserI) => {
      MessageDialog.value = `Esta seguro que desea Activar el usuario <strong> ${rows.user} ${rows.apellidos} </strong>`;

      warningDialog.value = true;
    };

    const directOptionsValue = async () => {
      loading.value = true;
      const result = await vistageneral(localStorage.getItem('idmandato'));
      if (result.ok) {
        const data = result.resultado;
        // Setea las filas
        rows.value = data;
        // Genera dinámicamente las columnas
        if (data.length > 0) {
          columns.value = Object.keys(data[0]).map((key) => ({
            name: key,
            label:
              key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
            align: 'left',
            field: key,
            sortable: true,
          }));
        }
      } else {
        $q.notify({
          type: 'negative',
          message: result.message,
        });
        router.push('/dashboard/listar-cartera');
      }
      loading.value = false;
    };
    function onCancel() {
      dialogVisibleDoc.value = false;
      warningDialog.value = false;
    }
    const viewReportLink = async () => {
      const response = await getLinkPowerBi(localStorage.getItem('idmandato'));

      if (response.ok && response.resultado.linkpbi !== '') {
        router.push('/dashboard/reporte-powerbi');
      } else {
        MessageDialog.value = `El mandato <strong> ${localStorage.getItem(
          'idmandato'
        )} </strong> no cuenta con una liga de power bi asignada, para continuar dar click en aceptar`;

        warningDialog.value = true;
      }
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

    const deletRow = async (row: DeleteProyectI) => {
      infoDelete.value = row;
      warningDialog.value = true;
      MessageDialog.value = viewConfig.value
        ? `Al borrar la configuración <strong> ${row.id} </strong> se tendrá que configurar nuevamente para realizar cargas de información nuevamente en el proyecto.`
        : `Al borrar el proyecto <strong> ${row.NombreProyecto} </strong> se limpiará todos los registros de esté en el sistema`;
    };

    const onConfirm = async () => {
      warningDialog.value = false;

      titleActions.value = 'Cargar Url Power Bi';
      dialogVisibleDoc.value = true;
    };

    onMounted(async () => {
      validuser.value = await isPermission.value.configUser
        .sysadocPermission[0];

      await directOptionsValue();
    });

    return {
      columns,
      filteredRows,
      dialogVisibleDoc,
      saveLink,
      viewReportLink,
      handleValue,
      saveUpload,
      directOptionsValue,
      titleActions,
      deletRow,
      ReportIncTotalDowload,
      validuser,
      viewMandatoSysadoc,
      loading,
      viewConfig,
      rows,
      rouViewPage,
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
      rouView,
      viewRow,
      editRow,
      capitalizeFirstLetter,
      capitalizeUserData,
    };
  },
};
