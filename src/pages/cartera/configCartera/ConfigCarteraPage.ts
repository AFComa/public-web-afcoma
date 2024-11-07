import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import * as XLSX from 'xlsx';
import { useRoute, useRouter } from 'vue-router';

import LoadingComponentBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import GridComponent from '../../../components/grid/ActionsUsers/GridActionComponent.vue';
import DialogComponent from '../../../components/Dialog/DialogComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';
import { useAuth } from 'src/composables/userAuth';
import { carteraAuth } from 'src/composables/carteraAuth';
import {
  isValidEmail,
  onlyNumeric,
  onlyAlphabetic,
} from '../../../utils/validations/validationInputs';
import {
  ListPermision,
  ListPermisionSisadoc,
  ListPermisionMandatos,
} from '../../../utils/users/usersColums';

export default {
  name: 'UsersPage',
  components: {
    GridComponent,
    BreadCrumb,
    DialogComponent,
    LoadingComponentBasic,
  },
  setup() {
    const loading = ref(false);
    const isPwd = ref(true);
    const warningDialog = ref(false);
    const nameCatalogo = ref('');
    const MessageDialog = ref('');
    const opt = ref('');
    const nameFirst = ref('');
    const selectItem = ref({
      label: '',
      value: '',
    });
    const options = ref([]);
    const actionBoton = ref();
    const $q = useQuasar();
    const router = useRoute();

    const { getCatalogo, createCatalogo, deleteCatalogo, editCatalogo } =
      carteraAuth();

    const breadcrumbRoutes = ref([
      { label: 'Listar Cartera', path: '/dashboard/listar-cartera' },
      {
        label: 'Configuración Cartera',
        path: '/dashboard/configuration-cartera',
      },
    ]);
    const {
      createUsers,
      isUserPermission,
      isSysadocPermission,
      isMandatosPermission,
      isTablePermission,
      isAcces,

      setPermissionUser,
      setPermissionSysad,
      setPermissionMandat,
      updateUsers,
    } = useAuth();
    const userForm = ref({
      email: '',
      nombre: '',
      apellido: '',
      phone: '',
    });
    const routers = useRouter();

    const addCatalogo = () => {
      if (nameCatalogo.value) {
        MessageDialog.value = `¿Estás seguro de guardar el campo <strong> ${nameCatalogo.value} </strong>?`;
        warningDialog.value = true;
        opt.value = 'add';
      }
    };

    const deleteOpt = () => {
      if (selectItem.value.label) {
        MessageDialog.value = `¿Estás seguro de elminar el campo <strong> ${selectItem.value.label} </strong>?`;
        warningDialog.value = true;
        opt.value = 'delete';
      }
    };

    const updateOpt = () => {
      if (selectItem.value.label) {
        MessageDialog.value = `¿Estás seguro de editar el campo <strong> ${selectItem.value.value} </strong>?`;
        warningDialog.value = true;
        opt.value = 'edit';
      }
    };

    const onSubmit = async () => {
      routers.push('configuration-relation');
    };

    const save = () => {
      loading.value = true;
      const data = {
        email: userForm.value.email,
        nombre: userForm.value.nombre,
        apellido: userForm.value.apellido,
        phone: userForm.value.phone,
        configUser: {
          usersPermissions:
            isUserPermission.value.length > 0
              ? isUserPermission.value
              : ListPermision(),
          sysadocPermission:
            isSysadocPermission.value.length > 0
              ? isSysadocPermission.value
              : ListPermisionSisadoc(),
          mandatosPermissions:
            isMandatosPermission.value.length > 0
              ? isMandatosPermission.value
              : ListPermisionMandatos(),
        },
      };

      setTimeout(async () => {
        const response = await createUsers(data);
        if (response.ok) {
          ResetStatePermission();
          $q.notify({
            type: 'positive',
            message:
              'La liga de acceso se genero exitosamente, favor de revisar su cuenta de correo electrónico.',
          });
          routers.push('/dashboard/listar-usuarios');
        } else {
          $q.notify({
            type: 'negative',
            message: response.message,
          });
        }
        loading.value = false;
      }, 5000);
    };

    const editUser = () => {
      loading.value = true;
      const data = {
        _id: router.params.id,
        email: isTablePermission.value.email,
        nombre: userForm.value.nombre,
        apellido: userForm.value.apellido,
        phone: userForm.value.phone,
        configUser: {
          usersPermissions: isUserPermission.value,
          sysadocPermission: isSysadocPermission.value,
          mandatosPermissions: isMandatosPermission.value,
        },
      };
      setTimeout(async () => {
        const response = await updateUsers(data);
        if (response.ok) {
          ResetStatePermission();
          routers.push('/dashboard');
          $q.notify({
            type: 'positive',
            message: 'El usuario se actualizo correctamente.',
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

    const ResetStatePermission = () => {
      setPermissionUser([]);
      setPermissionSysad([]);
      setPermissionMandat([]);
    };
    const onReset = () => {
      userForm.value = {
        email: '',
        nombre: '',
        apellido: '',
        phone: '',
      };
    };
    function onCancel() {
      warningDialog.value = false;
    }

    const onConfirm = async () => {
      warningDialog.value = false;
      loading.value = true;
      if (opt.value === 'add') {
        await saveCatalogo();
      } else if (opt.value === 'delete') {
        await deleteCampo();
      } else {
        await editarCampo();
      }
      await FormatData();
      loading.value = false;
    };

    const saveCatalogo = async () => {
      const data = {
        user: {
          user_name: `${isAcces.value.username} ${isAcces.value.apellidos}`,
          id_user: isAcces.value.ID,
        },
        nombre: nameCatalogo.value,
      };
      const response = await createCatalogo(data);
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
      nameCatalogo.value = '';
    };

    const FormatData = async () => {
      const result = await getCatalogo();
      options.value = result.resultado.layout.map((item: string) => ({
        label: item,
        value: item,
      }));
    };

    const deleteCampo = async () => {
      const data = {
        user: {
          user_name: `${isAcces.value.username} ${isAcces.value.apellidos}`,
          id_user: isAcces.value.ID,
        },
        nombre: selectItem.value.label,
      };

      const response = await deleteCatalogo(data);
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
      clearCampos();
    };

    const editarCampo = async () => {
      const data = {
        user: {
          user_name: `${isAcces.value.username} ${isAcces.value.apellidos}`,
          id_user: isAcces.value.ID,
        },
        nombre: selectItem.value.value,
        nuevo_nombre: selectItem.value.label,
      };

      const response = await editCatalogo(data);
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
      clearCampos();
    };

    const clearCampos = () => {
      selectItem.value.label = '';
      selectItem.value.value = '';
    };

    const dowloadPro = async () => {
      loading.value = true;
      const response = await getCatalogo();
      if (response.ok) {
        const worksheet = XLSX.utils.json_to_sheet(
          response.resultado.layout.map((item: string) => ({
            'Catálogo General': item,
          }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

        XLSX.writeFile(workbook, 'Catalogo_General_Layout.xlsx');
        $q.notify({
          type: 'positive',
          message: 'El reporte se decargó correctamente',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: response.message,
        });
      }
      loading.value = false;
    };

    onMounted(async () => {
      await FormatData();
    });

    return {
      userForm,
      selectItem,
      nameCatalogo,
      deleteOpt,
      dowloadPro,
      updateOpt,
      opt,
      onConfirm,
      clearCampos,
      editarCampo,
      saveCatalogo,
      nameFirst,
      addCatalogo,
      deleteCampo,
      FormatData,
      options,
      onCancel,
      MessageDialog,
      warningDialog,
      isPwd,
      actionBoton,

      save,
      editUser,
      loading,
      ResetStatePermission,
      onSubmit,
      onReset,
      isValidEmail,
      onlyNumeric,
      onlyAlphabetic,
      breadcrumbRoutes,
    };
  },
};
