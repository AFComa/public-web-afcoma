import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const userForm = ref({
      email: '',
      password: '',
    });
    const router = useRouter();

    return {
      userForm,
      isPwd: ref(true),

      onSubmit() {
        router.push('code');
        console.log('Royuter: ', userForm.value);
      },
      onReset() {
        userForm.value = {
          email: '',
          password: '',
        };
      },

      isValidEmail(val: string) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'El correo no parece ser válido';
      },
    };
  },
});
