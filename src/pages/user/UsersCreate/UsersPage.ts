import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import LoadingOver from '../../../components/Loading/LoadingComponent.vue';
import GridComponent from '../../../components/grid/ActionsUsers/GridActionComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';
import { useAuth } from 'src/composables/userAuth';
import {
  isValidEmail,
  onlyNumeric,
  onlyAlphabetic,
} from '../../../utils/validations/validationInputs';
export default {
  name: 'UsersPage',
  components: {
    LoadingOver,
    GridComponent,
    BreadCrumb,
  },
  setup() {
    const loading = ref(false);
    const isPwd = ref(true);
    const actionBoton = ref();
    const $q = useQuasar();
    const router = useRoute();
    const breadcrumbRoutes = ref([
      { label: 'Listar Usuario', path: '/dashboard/listar-usuarios' },
      { label: 'Usuario', path: '/dashboard/usuarios' },
    ]);
    const {
      createUsers,
      isUserPermission,
      isSysadocPermission,
      isMandatosPermission,
      isTablePermission,
      updateUsers,
    } = useAuth();
    const userForm = ref({
      email: '',
      nombre: '',
      apellido: '',
      phone: '',
    });
    const routers = useRouter();

    const onSubmit = async () => {
      // Validar que las configUuraciones de permiso no sean nulas
      // if (
      //   !isUserPermission.value ||
      //   !isSysadocPermission.value ||
      //   !isMandatosPermission.value
      // ) {
      //   $q.notify({
      //     type: 'warning',
      //     message: 'Debe asignar permisos antes de continuar.',
      //   });
      //   return;
      // }
      actionBoton.value === 'view'
        ? routers.push('/dashboard')
        : actionBoton.value === 'edit'
        ? editUser()
        : save();
    };

    const save = () => {
      loading.value = true;
      const data = {
        email: userForm.value.email,
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
        const response = await createUsers(data);
        if (response.ok) {
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
    const onReset = () => {
      userForm.value = {
        email: '',
        nombre: '',
        apellido: '',
        phone: '',
      };
    };

    onMounted(() => {
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
      actionBoton,
      save,
      editUser,
      loading,
      onSubmit,
      onReset,
      isValidEmail,
      onlyNumeric,
      onlyAlphabetic,
      breadcrumbRoutes,
    };
  },
};
