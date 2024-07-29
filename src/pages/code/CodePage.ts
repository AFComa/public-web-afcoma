import { ref } from 'vue';
import { useRouter } from 'vue-router';

import LoadingOverBasic from '../../components/Loading/LoadingBasicComponent.vue';

export default {
  name: 'CodePage',
  components: {
    LoadingOverBasic,
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const securityCodeInputs = ref<string[]>(Array(6).fill(''));
    const inputRefs = ref<(HTMLInputElement | null)[]>([]);
    const userForm = ref({
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      text6: '',
    });

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
        await new Promise((resolve) => setTimeout(resolve, 5000));
        router.push('dashboard');
      } finally {
        loading.value = false;
      }
      console.log('Royuter: ', userForm.value);
    };

    return {
      securityCodeInputs,
      setInputRef,
      focusNextInput,
      focusPreviousInput,
      userForm,
      loading,
      onSubmit,
    };
  },
};
