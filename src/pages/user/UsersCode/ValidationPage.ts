import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import LoadingOver from '../../../components/Loading/LoadingComponent.vue';
import LoadingOverBasic from '../../../components/Loading/LoadingBasicComponent.vue';

export default {
  name: 'validationPage',
  components: {
    LoadingOver,
    LoadingOverBasic,
  },
  setup() {
    const loading = ref(false);
    const router = useRouter();
    const securityCodeInputs = ref<string[]>(Array(6).fill(''));
    const inputRefs = ref<(HTMLInputElement | null)[]>([]);
    const $q = useQuasar();

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
      try {
        const securityCode = securityCodeInputs.value.join('');
        console.log('Cuenta con el código:', securityCode);

        await new Promise((resolve) => setTimeout(resolve, 10000));
        router.push('password');
      } finally {
        loading.value = false;
      }
    };

    const loadData = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        $q.notify({ message: 'Código validado correctamente', color: 'green' });
      }, 2000);
    };

    return {
      securityCodeInputs,
      setInputRef,
      loading,
      focusNextInput,
      focusPreviousInput,
      onSubmit,
      loadData,
    };
  },
};
