import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadingOverBasic from '../../components/Loading/LoadingBasicComponent.vue';

export default {
  name: 'HomePage',
  components: {
    LoadingOverBasic,
  },
  setup() {
    const loading = ref(false);
    const isPwd = ref(true);
    const userForm = ref({
      email: '',
      password: '',
    });
    const router = useRouter();

    const onSubmit = async () => {
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        router.push('code');
      } finally {
        loading.value = false;
      }
      console.log('Royuter: ', userForm.value);
    };
    const onReset = () => {
      userForm.value = {
        email: '',
        password: '',
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
