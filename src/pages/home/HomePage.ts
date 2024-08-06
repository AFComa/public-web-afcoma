import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import type {
  LoginSuccess,
  LoginError,
} from '../../interfaces/auth/Acces.interfaces';
import LoadingOverBasic from '../../components/Loading/LoadingBasicComponent.vue';
import { useAuth } from 'src/composables/userAuth';
import {
  isValidEmail,
  isPassword,
} from '../../utils/validations/validationInputs';

export default {
  name: 'HomePage',
  components: {
    LoadingOverBasic,
  },
  setup() {
    const loading = ref(false);
    const isPwd = ref(true);
    const { saveUser, getIp } = useAuth();
    const $q = useQuasar();

    const userForm = ref({
      usuario: '',
      password: '',
      ip: '',
    });
    const router = useRouter();

    const onSubmit = async () => {
      loading.value = true;
      const data: LoginSuccess | LoginError = await saveUser(userForm.value);
      if (data.ok) {
        router.push('code');
      } else {
        $q.notify({
          type: 'negative',
          message: data.message,
        });
      }
      loading.value = false;
    };
    const onReset = () => {
      userForm.value = {
        usuario: '',
        password: '',
        ip: '',
      };
    };

    onMounted(async () => {
      userForm.value.ip = await getIp();
    });

    return {
      userForm,
      isPwd,
      loading,
      onSubmit,
      onReset,
      isValidEmail,
      isPassword,
    };
  },
};
