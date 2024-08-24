import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import LoadingOver from '../../../components/Loading/LoadingComponent.vue';
import GridComponent from '../../../components/grid/ActionsUsers/GridActionComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';
import DialogProyectComponent from '../../../components/Dialog/DialogProyectComponent.vue';
import { sysadocAuth } from 'src/composables/sysadocAuth';
import { CartProyectI } from 'src/interfaces/auth/Acces.interfaces';
import { CreateProyectI } from 'src/interfaces/components/Grid.interfaces';

export default {
  name: 'UsersPage',
  components: {
    LoadingOver,
    GridComponent,
    BreadCrumb,
    DialogProyectComponent,
  },
  setup() {
    const loading = ref(false);
    const isPwd = ref(true);
    const dialogVisible = ref(false);
    const actionBoton = ref();
    const $q = useQuasar();
    const router = useRoute();
    const breadcrumbRoutes = ref([
      { label: 'Sys@Doc', path: '/dashboard/view-doc' },
      { label: 'Listar Proyectos', path: '/dashboard/listar-proyectos' },
      { label: 'Proyectos', path: '/dashboard/proyectos' },
    ]);

    const { CreateProyects, UpdateProyects, isViewProyects } = sysadocAuth();
    const pryectForm = ref({
      identificador: '',
      originador: '',
      fondeador: '',
      bancaria: '',
      primario: '',
      maestro: '',
      juridico: '',
      comun: '',
      calificadora: '',
      auditores: '',
    });
    const cartProyect = ref();
    const routers = useRouter();

    const showProyect = () => {
      dialogVisible.value = true;
    };

    const onSubmit = async () => {
      // Validar que las configUuraciones de permiso no sean nulas
      const data = {
        identificador: pryectForm.value.identificador,
        originador: pryectForm.value.originador,
        fondeador: pryectForm.value.fondeador,
        institucion_bancaria: pryectForm.value.bancaria,
        administrador_primario: pryectForm.value.primario,
        administrador_maestro: pryectForm.value.maestro,
        despacho_juridico: pryectForm.value.juridico,
        representante_comun: pryectForm.value.comun,
        calificadora: pryectForm.value.calificadora,
        despacho_auditores: pryectForm.value.auditores,
        nombre_contacto: cartProyect.value?.name ? cartProyect.value?.name : '',
        correo_contacto: cartProyect.value?.email
          ? cartProyect.value?.email
          : '',
        telefono_contacto: cartProyect.value?.telefono
          ? cartProyect.value?.telefono
          : '',
        url_reporte: cartProyect.value?.reporteoApi
          ? cartProyect.value?.reporteoApi
          : '',
        url_incidencia: cartProyect.value?.incidenciaApi
          ? cartProyect.value?.incidenciaApi
          : '',
        _id: router.params.id ? router.params.id : undefined,
      };
      console.log('pryectForm: ', pryectForm.value);

      actionBoton.value === 'view'
        ? routers.push('/dashboard//listar-proyectos')
        : actionBoton.value === 'edit' && router.params.id
        ? editUser(data)
        : save(data);
    };

    const save = (data: CreateProyectI) => {
      loading.value = true;
      console.log('cartProyect: ', cartProyect.value?.name);

      setTimeout(async () => {
        const response = await CreateProyects(data);
        if (response.ok) {
          $q.notify({
            type: 'positive',
            message: response.resultado,
          });
          routers.push('/dashboard/listar-proyectos');
        } else {
          $q.notify({
            type: 'negative',
            message: response.message,
          });
        }
        loading.value = false;
      }, 5000);
    };
    const editUser = (data: CreateProyectI) => {
      loading.value = true;

      setTimeout(async () => {
        const response = await UpdateProyects(data);
        if (response.ok) {
          routers.push('/dashboard/listar-proyectos');
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
        loading.value = false;
      }, 5000);
    };

    function onCancel() {
      dialogVisible.value = false;
    }

    const handleSelect = async (selectedValue: CartProyectI) => {
      console.log('selectedValue: ', selectedValue);
      cartProyect.value = selectedValue;
      console.log('cartProyect: ', cartProyect);
    };
    onMounted(() => {
      console.log('isViewProyects: ', isViewProyects);

      actionBoton.value = localStorage.getItem('actionuser');
      if (router.params.id) {
        pryectForm.value.identificador = isViewProyects.value[0].Identificador;
        pryectForm.value.originador = isViewProyects.value[0].Originador;
        pryectForm.value.fondeador = isViewProyects.value[0].Fondeador;
        pryectForm.value.bancaria = isViewProyects.value[0].InstitucionBancaria;
        pryectForm.value.primario =
          isViewProyects.value[0].AdministradorPrimario;
        pryectForm.value.maestro = isViewProyects.value[0].AdministradorMaestro;
        pryectForm.value.juridico = isViewProyects.value[0].DespachoJuridico;
        pryectForm.value.comun = isViewProyects.value[0].RepresentanteComun;
        pryectForm.value.calificadora = isViewProyects.value[0].Calificadora;
        pryectForm.value.auditores = isViewProyects.value[0].DespachoAuditores;
      }
    });

    return {
      pryectForm,
      isPwd,
      cartProyect,
      handleSelect,
      actionBoton,
      save,
      editUser,
      onCancel,
      loading,
      onSubmit,
      dialogVisible,
      breadcrumbRoutes,
      showProyect,
    };
  },
};
