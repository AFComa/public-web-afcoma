import { ref } from 'vue';
// import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import LoadingOver from '../../../components/Loading/LoadingComponent.vue';
import GridComponent from '../../../components/grid/ActionsUsers/GridActionComponent.vue';
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
  },
  setup() {
    const loading = ref(false);
    const isPwd = ref(true);
    const $q = useQuasar();
    const {
      createUsers,
      isUserPermission,
      isSysadocPermission,
      isMandatosPermission,
    } = useAuth();
    const userForm = ref({
      email: '',
      nombre: '',
      apellido: '',
      phone: '',
    });
    // const router = useRouter();

    const onSubmit = async () => {
      // Validar que las configuraciones de permiso no sean nulas
      if (
        !isUserPermission.value ||
        !isSysadocPermission.value ||
        !isMandatosPermission.value
      ) {
        $q.notify({
          type: 'warning',
          message: 'Debe asignar permisos antes de continuar.',
        });
        return;
      }
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
              'La liga de acceso se genero exitosamente, favor de revisar su cuenta de correo electronico.',
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

    return {
      userForm,
      isPwd,
      loading,
      onSubmit,
      onReset,
      isValidEmail,
      onlyNumeric,
      onlyAlphabetic,
    };
  },
};
