import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuth } from 'src/composables/userAuth';
import LoadingOverBasic from '../../components/Loading/LoadingBasicComponent.vue';
import type {
  LoginSuccess,
  LoginError,
} from '../../interfaces/auth/Acces.interfaces';

export default {
  name: 'CodePage',
  components: {
    LoadingOverBasic,
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const { validCode } = useAuth();
    const $q = useQuasar();
    const securityCodeInputs = ref<string[]>(Array(6).fill(''));
    const inputRefs = ref<(HTMLInputElement | null)[]>([]);

    const setInputRef = (el: HTMLInputElement | null, index: number) => {
      inputRefs.value[index] = el;
    };

    const focusNextInput = (index: number) => {
      if (
        index < securityCodeInputs.value.length - 1 &&
        securityCodeInputs.value[index]
      ) {
        inputRefs.value[index + 1]?.focus();
      }
    };

    const focusPreviousInput = (index: number, event: KeyboardEvent) => {
      if (
        event.key === 'Backspace' &&
        index > 0 &&
        !securityCodeInputs.value[index]
      ) {
        inputRefs.value[index - 1]?.focus();
      }
    };

    const onSubmit = async () => {
      loading.value = true;
      const concatenatedCode = securityCodeInputs.value.join('');
      const data: LoginSuccess | LoginError = await validCode(concatenatedCode);

      if (data.ok) {
        router.push('dashboard');
      } else {
        $q.notify({
          type: 'negative',
          message: data.message,
        });
      }

      loading.value = false;
    };

    return {
      securityCodeInputs,
      setInputRef,
      focusNextInput,
      focusPreviousInput,
      loading,
      onSubmit,
    };
  },
};
