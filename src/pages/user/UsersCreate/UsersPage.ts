import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadingOver from '../../../components/Loading/LoadingComponent.vue';
import GridComponent from '../../../components/grid/ActionsUsers/GridActionComponent.vue';

export default {
  name: 'UsersPage',
  components: {
    LoadingOver,
    GridComponent,
  },
  setup() {
    const loading = ref(false);
    const isPwd = ref(true);
    const userForm = ref({
      email: '',
      nombre: '',
      apellido: '',
    });
    const router = useRouter();

    const onSubmit = async () => {
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        router.push('/validation-code');
      } finally {
        loading.value = false;
      }
      const data = {
        user: userForm.value,
        configUser: {
          usersPermissions: [
            {
              id: 1,
              module: 'Administración',
              create: false,
              edit: false,
              delete: false,
              view: false,
              download: false,
              opera: false,
            },
          ],

          sysadocPermission: [
            {
              id: 1,
              module: 'Administración',
              create: false,
              edit: false,
              delete: false,
              view: false,
              download: false,
              opera: false,
            },
          ],

          mandatosPermissions: [
            {
              id: 1,
              module: 'Administración',
              create: false,
              edit: false,
              delete: false,
              view: false,
              download: false,
              opera: false,
            },
          ],
        },
      };
      console.log('Royuter: ', data);
    };
    const onReset = () => {
      userForm.value = {
        email: '',
        nombre: '',
        apellido: '',
      };
    };

    const isValidEmail = (val: string) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'El correo no parece ser válido';
    };

    return {
      userForm,
      isPwd,
      loading,
      onSubmit,
      onReset,
      isValidEmail,
    };
  },
};
