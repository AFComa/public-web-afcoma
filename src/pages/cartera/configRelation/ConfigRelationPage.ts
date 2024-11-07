import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import * as XLSX from 'xlsx';

import LoadingComponentBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import GridComponent from '../../../components/grid/ActionsUsers/GridActionComponent.vue';
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
  name: 'RelationPage',
  components: {
    LoadingComponentBasic,
    GridComponent,
    BreadCrumb,
  },
  setup() {
    const loading = ref(false);
    const isPwd = ref(true);
    const FileExcel = ref();
    const selectValue = ref({
      label: '',
      value: '',
    });
    const options = ref([]);
    const actionBoton = ref();
    const $q = useQuasar();
    const router = useRoute();
    const breadcrumbRoutes = ref([
      { label: 'Listar Cartera', path: '/dashboard/listar-cartera' },
      {
        label: 'Relación Layout Cartera',
        path: '/dashboard/configuration-relation',
      },
    ]);
    const {
      createUsers,
      isUserPermission,
      isSysadocPermission,
      isMandatosPermission,
      isTablePermission,
      setPermissionUser,
      setPermissionSysad,
      setPermissionMandat,
      updateUsers,
      isAcces,
    } = useAuth();

    const { getCatalogoAssing, relationCatalog } = carteraAuth();

    const userForm = ref({
      email: '',
      nombre: '',
      apellido: '',
      phone: '',
    });
    const routers = useRouter();

    const onSubmit = async () => {
      if (FileExcel.value && selectValue.value.label) {
        const data = {
          user: {
            user_name: `${isAcces.value.username} ${isAcces.value.apellidos}`,
            id_user: isAcces.value.ID,
          },
          nombre_mandato: selectValue.value.label,
          relacion: FileExcel.value,
        };
        const response = await relationCatalog(data);
        if (response.ok) {
          routers.push('/dashboard/listar-cartera');
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
      } else {
        $q.notify({
          type: 'negative',
          message:
            'Los campos son obligatorios, favor de cargar la información',
        });
      }
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

    const InfoFormat = async () => {
      const result = await getCatalogoAssing();
      options.value = result.resultado.map(
        (item: { _id: string; idmandato: string }) => ({
          label: item.idmandato,
          value: item._id,
        })
      );
    };

    const onFileChange = (e: {
      preventDefault: () => void;
      target: { files: Blob[] };
    }) => {
      e.preventDefault();

      if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const CargaRegistros = XLSX.utils.sheet_to_json(worksheet);
          FileExcel.value = CargaRegistros;
        };
        reader.readAsArrayBuffer(e.target.files[0]);
      }
    };

    onMounted(async () => {
      await InfoFormat();
      actionBoton.value = localStorage.getItem('actionuser');
      if (router.params.id) {
        userForm.value.nombre = isTablePermission.value.user;
        userForm.value.apellido = isTablePermission.value.apellidos;
        userForm.value.email = isTablePermission.value.email;
        userForm.value.phone = isTablePermission.value.phone;
      }
    });

    return {
      userForm,
      isPwd,
      onFileChange,
      FileExcel,
      actionBoton,
      selectValue,
      InfoFormat,
      save,
      editUser,
      loading,
      ResetStatePermission,
      onSubmit,
      onReset,
      options,
      isValidEmail,
      onlyNumeric,
      onlyAlphabetic,
      breadcrumbRoutes,
    };
  },
};
