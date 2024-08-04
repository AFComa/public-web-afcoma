import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import type {
  LoginSuccess,
  LoginError,
} from '../../interfaces/auth/Acces.interfaces';
import LoadingOverBasic from '../../components/Loading/LoadingBasicComponent.vue';
import { useAuth } from 'src/composables/userAuth';

export default {
  name: 'HomePage',
  components: {
    LoadingOverBasic,
  },
  setup() {
    const loading = ref(false);
    const isPwd = ref(true);
    const { saveUser } = useAuth();
    const $q = useQuasar();

    const userForm = ref({
      usuario: '',
      password: '',
      ip: '205.345.34.23',
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
        ip: '205.345.34.23',
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
