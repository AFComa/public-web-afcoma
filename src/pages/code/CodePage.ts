import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'CodePage',
  setup() {
    const router = useRouter();
    const userForm = ref({
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      text6: '',
    });

    return {
      userForm,
      onSubmit() {
        router.push('dashboard');
        console.log('Royuter: ', userForm.value);
      },
    };
  },
});
